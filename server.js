const app = require('./app')
const server = app({dbUrl: 'mongodb://localhost:27017'})

server.listen(3000, () => console.log(`Listening on http://localhost:3000`))