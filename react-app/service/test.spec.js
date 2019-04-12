var superagent = require('../lib/superagent')
var fs = require('fs')

it('superagent', function() {
  return superagent.get('google.com').attach('file','test/fixtures/tree.jpg')
})

it('fs', function(done) {
  console.log(fs.readdirSync('./test'))
  done()
})

