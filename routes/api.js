const express = require('express')
const router = express.Router()
const lib = require('../lib')

router.use(express.json())

router.get('/sighting', lib.asyncHandler( async (req, res, next) => {
  res.json(await req.db.collection('sightings').find().toArray())
}))

const multipartParser = require('multer')({ dest: 'public/uploads/'}).fields([{ name: 'imageFiles' }])
router.post(
  '/sighting',
  multipartParser,
  lib.asyncHandler(
    async (req, res, next) => {
      console.log('HERE')
      const uid = await lib.auth(req.cookies.auth)

      const sighting = {
        author: uid,
        images: req.files.imageFiles,
        notes: req.body.notes,
        createdOn: new Date(),
        location: null
      }

      const db = await req.db
      await db.collection('sightings').insertOne(sighting)
      res.sendStatus(201)
    }
  )
)

module.exports = router;