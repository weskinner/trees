const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const mongodbMiddleware = require('./mongodb-middleware')
const lib = require('./lib')
const api = require('./routes/api')

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(mongodbMiddleware())
app.use('/api', api)

// requests to client app routes (hopefully)
app.use('*', (req, res) => res.sendFile(require('path').join(__dirname,'public/index.html')) )

app.listen(3000, () => console.log(`Listening on http://localhost:3000`))