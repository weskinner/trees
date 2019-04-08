var assert = require('assert')
var mongoUnit = require('mongo-unit')
const request = require('superagent')

var dbUrl, server, app

before('Init MongoUnit', function(done) {
  mongoUnit.start()
    .then(url => {
      dbUrl = url
      done()
    })
    .catch(done)
})

before('Init App', function(done) {
  app = require('../app')({dbUrl})
  server = app.listen(9999, done)
})

it('should create a sighting', function() {
  return request
      .post('http://localhost:9999/api/sighting')
      .field('notes', 'test notes')
      .attach('imageFiles', './test/fixtures/tree.jpg')
      .then(res => {
        assert(res.status == 201)
      })
})

after('Shutdown App', function(done) {
  app.shutdown()
  server.close(done)
})

after('Shutdown MongoUnit', function() {
  mongoUnit.stop()
})