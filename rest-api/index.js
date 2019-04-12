const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const initDb = require('./lib/db')
const lib = require('./lib')
const api = require('./routes/api')
const path = require('path')

module.exports = function(config) {
  console.log("Configuring rest-api for env: "+process.env.NODE_ENV)
  const db = initDb(config)
  const app = express()

  if (process.env.NODE_ENV == 'development') {
    addDevelopmentMiddlewares(app, config)
  }

  app.disable('x-powered-by')
  app.use(cookieParser())
  app.use(express.static(__dirname + '/static'))
  app.use(db.middleware())
  app.use('/api', api)

  // requests to client app routes (hopefully)
  app.use('*', (req, res) => res.sendFile(path.join(__dirname,'static/index.html')) )

  app.shutdown = function() {
    console.log("Shutting down rest-api")
    return db.shutdown()
  }

  return app
}

function addDevelopmentMiddlewares(app, config) {
  app.use(morgan('dev'))
  app.use((req,res,next) => {
    res.append('Access-Control-Allow-Origin','*')
    next()
  })
}