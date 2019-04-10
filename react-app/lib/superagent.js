import superagent from 'superagent'
import prefix from 'superagent-prefix'

if (process.env.NODE_ENV == 'production') {
  module.exports = superagent.agent()
}
else {
  console.log("Superagent is in development mode")
  module.exports = superagent.agent().use(prefix('http://localhost:3000'))
}