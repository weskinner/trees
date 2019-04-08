const request = require('superagent')
var mongoUnit = require('mongo-unit')

mongoUnit.start()
  .then(dbUrl => {
    var app = require('./app')({dbUrl})
    server = app.listen(9999, function() {
      console.log("args",arguments)

      request
        .post('http://localhost:9999/api/sighting')
        .field('notes', 'test notes')
        .attach('imageFiles', './test/fixtures/tree.jpg')
        .then(res => {
          require('assert')(res.status == 201)
        })
        .catch(err => console.log("err",err))
        .then(_ => {
          console.log("closing server")
          server.close((a) => {
            console.log("shutting down app")
            app.shutdown()
            console.log("shutting down mongoUnit")
            mongoUnit.stop()
          })
        })
    })
  })
  .catch(err => {
    console.log(err)
    mongoUnit.stop()
  })