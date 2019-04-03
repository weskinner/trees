const express = require('express')
const router = express.Router()
const lib = require('../lib')

router.use(express.json())

router.get('/sightings', lib.asyncHandler( async (req, res, next) => {
  res.json(await req.db.collection('sightings').find().toArray())
}))

module.exports = router;