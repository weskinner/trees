module.exports = function(config) {
  const express = require('express')
  const cookieParser = require('cookie-parser')
  const morgan = require('morgan')
  const db = require('./lib/db')(config)
  const lib = require('./lib')
  const api = require('./routes/api')

  const app = express()
  app.disable('x-powered-by')
  app.use(cookieParser())
  app.use(morgan('dev'))
  app.use(express.static('public'))
  app.use(db.middleware())
  app.use('/api', api)

  app.get('/test', (req,res) => res.sendStatus(200))

  // requests to client app routes (hopefully)
  app.use('*', (req, res) => res.sendFile(require('path').join(__dirname,'public/index.html')) )

  app.shutdown = function() {
    db.shutdown()
  }

  return app
}
