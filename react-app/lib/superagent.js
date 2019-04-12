const superagent = require('superagent')
const prefix = require('superagent-prefix')

if (process.env.NODE_ENV == 'production') {
  module.exports = superagent.agent()
}
else if (process.env.NODE_ENV == 'testing') {
  console.log("Superagent is in testing mode")
  module.exports = superagent.agent().use(prefix('http://localhost:9999'))
} else {
  console.log("Superagent is in development mode")
  module.exports = superagent.agent()
}