const express = require('express')
const Multer  = require('multer')
const multer = Multer({ dest: 'public/uploads/'})
const MongoClient = require('mongodb').MongoClient
const cookieParser = require('cookie-parser')
const path = require('path')
const mongodbMiddleware = require('./mongodb-middleware')
const lib = require('./lib')
const api = require('./routes/api')

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())
app.use((req, res, next) => {console.log(`${req.method} ${req.path}`);next()})
app.use(express.static('public'))
app.use(mongodbMiddleware())
app.use('/api', api)

app.post(
  '/submit',
  multer.fields([{ name: 'leaf', maxCount: 1 }, { name: 'tree', maxCount: 1 }]),
  lib.asyncHandler( async (req, res, next) => {
    const uid = await verifyIdToken(req.cookies.auth)

    const leafFile = req.files['leaf'][0]
    const treeFile = req.files['tree'][0]

    const db = await req.db
    await db.collection('sightings').insertOne({commonName: req.body.commonName, leafFile, treeFile, uid})
    res.redirect('/')  
  }))

// requests to client app routes (hopefully)
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname,'public/index.html'))
})

app.listen(3000, () => console.log(`Listening on http://localhost:3000`))