const mongoUnit = require('mongo-unit')
const restAPI = require('./rest-api')

var dbUrl, server, app

exports.getDbUrl = function() { return dbUrl }
exports.getServer = function() { return server }
exports.getApp = function() { return app }

before('Init MongoUnit', function(done) {
  this.timeout(30000) // mongo-unit has a long startup un-cached

  mongoUnit.start()
    .then(url => {
      console.log("mongo-unit",`started with url ${url}`)
      dbUrl = url
      done()
    })
    .catch(done)
})

before('Init App', function(done) {
  app = restAPI({dbUrl})
  server = app.listen(9999, done)
})

after('Shutdown App', function(done) {
  server.close(err => {
    if(err) throw err

    app.shutdown()
      .catch(err => console.log('error shutting down app', app))
      .then(_ => {
        console.log('finished shutting down app')
        done()
      })
  })
})

after('Shutdown MongoUnit', function() {
  return mongoUnit.stop()
    .catch(err => console.log('error shutting down mongo-unit', err))
    .then(_ => console.log('finished shutting down mongo-unit'))
})

