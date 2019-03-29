const express = require('express')
const apiRouter = express.Router()
const Multer  = require('multer')
const MongoClient = require('mongodb').MongoClient
const multer = Multer({ dest: 'public/uploads/'})

const app = express()

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})
app.use(express.static('public'))

app.post('/submit', multer.fields([{ name: 'leaf', maxCount: 1 }, { name: 'tree', maxCount: 1 }]), async function(req, res, next) {
  try {
    const leafFile = req.files['leaf'][0]
    const treeFile = req.files['tree'][0]

    const mongo = await MongoClient.connect('mongodb://localhost:27017')
    const treeDb = mongo.db('tree')

    console.log(leafFile, treeFile)
    
    await treeDb.collection('sightings').insertOne({commonName: req.body.commonName, leafFile, treeFile})
    res.redirect('/')
  } catch (err) {
    res.status(500).send(err)
  }
})

apiRouter.use(express.json())
apiRouter.get('/sightings', async (req, res, next) => {
  const mongo = await MongoClient.connect('mongodb://localhost:27017')
  res.json(await mongo.db('tree').collection('sightings').find().toArray())  
})
app.use('/api', apiRouter)

app.listen(3000, () => console.log(`Listening on http://localhost:3000`))