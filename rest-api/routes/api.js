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
      const uid = await lib.auth(req.cookies.auth)

      var sighting = {
        author: uid,
        images: req.files.imageFiles,
        notes: req.body.notes,
        createdOn: new Date(),
        location: null
      }

      const db = await req.db
      var result = await db.collection('sightings').insertOne(sighting)
      sighting._id = result.insertedId
      res.status(201).json(sighting)
    }
  )
)

module.exports = router;