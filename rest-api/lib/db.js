module.exports = function initDbApp(config) {
  const MongoClient = require('mongodb').MongoClient;

  const client = new MongoClient(config.dbUrl, { useNewUrlParser: true });

  var pConn = client.connect().catch(err => console.log(err));

  return {
    middleware: function() {
      return function mongodbMiddleware(req, res, next) {
        req.db = pConn.then(c => c.db('trees'))

        next()
      }
    },

    shutdown: function() {
      pConn.then(c => c.close())
    }
  }
}

