const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const initDb = require('./lib/db')
const lib = require('./lib')
const api = require('./routes/api')
const path = require('path')

module.exports = function(config) {
  const db = initDb(config)
  const app = express()
  app.disable('x-powered-by')
  app.use(cookieParser())
  app.use(morgan('dev'))
  app.use(express.static(__dirname + '/static'))
  app.use(db.middleware())
  app.use('/api', api)

  // requests to client app routes (hopefully)
  app.use('*', (req, res) => res.sendFile(path.join(__dirname,'static/index.html')) )

  app.shutdown = function() {
    db.shutdown()
  }

  return app
}
