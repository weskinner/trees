const googleClientId = '146370768632-uvb7hbnqgnrrkor1ng5lrpphnk34opdl.apps.googleusercontent.com'

const express = require('express')
const Multer  = require('multer')
const multer = Multer({ dest: 'public/uploads/'})
const MongoClient = require('mongodb').MongoClient
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(googleClientId)
const cookieParser = require('cookie-parser')

class AppError extends Error {
  constructor(...params) {
    super(...params);
    this.name = 'AppError';
  }
}

class AuthError extends Error {
  constructor(...params) {
    super(...params);
    this.name = 'AuthError';
  }
}

function asyncHandler(fn) {
  return function asyncHandlerMiddleware(req, res, next) {
    Promise
    .resolve(fn(req, res, next))
    .catch(next)
  }
}

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())
app.use((req, res, next) => {console.log(`${req.method} ${req.path}`);next()})
app.use(express.static('public'))

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })
  .then((conn) => {

    const db = conn.db('tree')
    app.use((req, res, next) => {
      req.db = db
      next()
    })

    app.post(
      '/submit',
      multer.fields([{ name: 'leaf', maxCount: 1 }, { name: 'tree', maxCount: 1 }]),
      asyncHandler( async (req, res, next) => {
        const uid = await verifyIdToken(req.cookies.auth)

        const leafFile = req.files['leaf'][0]
        const treeFile = req.files['tree'][0]

        await db.collection('sightings').insertOne({commonName: req.body.commonName, leafFile, treeFile, uid})
        res.redirect('/')  
      }))

    const apiRouter = express.Router()
    apiRouter.use(express.json())
    apiRouter.get('/sightings', asyncHandler( async (req, res, next) => {
      res.json(await req.db.collection('sightings').find().toArray())
    }))

    async function verifyIdToken(token) {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: googleClientId
      })
      const payload = ticket.getPayload()
      const userId = payload['sub']
      const clientId = payload['aud']
      const expiresAt = payload['exp']

      if (clientId != googleClientId) {
        throw new AuthError("Verify failed.  Client ID should match env config. Seeing " + clientId)
      } else if ((Date.now()/1000) > expiresAt) {
        throw new AuthError("Verify failed. Token is expired.")
      }
      console.log('Token verified.')

      console.log('Looking for profile.')
      var profile = await db.collection('profiles').findOne({'uid': userId});
      if(profile) {
        console.log('Profile found.')
      } else {
        console.log('Creating profile.')
        profile = await db.collection('profiles').insertOne({uid: userId})
      }

      return profile
    }

    app.use('/api', apiRouter)
    app.listen(3000, () => console.log(`Listening on http://localhost:3000`))
  })