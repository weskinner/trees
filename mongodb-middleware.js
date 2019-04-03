const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url, { useNewUrlParser: true });

var pConn = client.connect().catch(err => console.log(err));

module.exports = function () {
  return function mongodbMiddleware(req, res, next) {
    req.db = pConn.then(c => c.db('trees'))

    next()
  }
}