module.exports = function initDbApp(config) {
  const MongoClient = require('mongodb').MongoClient;

  const client = new MongoClient(config.dbUrl, { useNewUrlParser: true });

  var pConn = client.connect().catch(err => console.log(err));
  console.log('db',`connecting mongo client to ${config.dbUrl}`)

  return {
    middleware: function() {
      return function mongodbMiddleware(req, res, next) {
        req.db = pConn.then(c => c.db('trees'))

        next()
      }
    },

    shutdown: function() {
      return pConn.then(c => c.close())
    }
  }
}

