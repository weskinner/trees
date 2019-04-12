const request = require('superagent')
const sightingService = require('./sighting')
const testInstance = require('../../test-instance')
const assert = require('chai').assert

var sighting = {notes: 'test notes', images:['./rest-api/test/fixtures/tree.jpg']}

describe('client sighting service', _ => {
  it('should create a sighting', function() {
    return sightingService
      .create(sighting) // in the browser .images will be File objects
      .then(res => {
          sighting._id = res.body._id
          assert.equal(res.body.notes, sighting.notes, 'notes match')
          assert.equal(res.status, 201, 'we get created status')
        })
  })

  it('should retrieve a list of sightings', done => {
    return sightingService
      .list()
      .then(res => {
        assert.equal(res.status, 200, 'we get ok status')
      })
  })

  it('should retrieve a sighting', done => {
    return sightingService
      .get(sighting._id)
      .then(res => {
        assert.equal(res.body.notes, sighting.notes, 'notes match')
        assert.equal(res.status, 200, 'we get ok status')
      })
  })

  it('should update a sighting', done => {
    sighting.notes = 'new notes'
    return sightingService
      .update(sighting)
      .then(res => {
        assert.equal(res.body.notes, sighting.notes, 'notes match')
        assert.equal(res.status, 200, 'we get ok status')
      })
  })

  it('should delete a sighting', done => {
    sighting.notes = 'new notes'
    return sightingService
      .delete(sighting._id)
      .then(res => {
        assert.equal(res.status, 204, 'we get no content status')
      })
  })
})