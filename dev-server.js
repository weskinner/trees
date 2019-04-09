const initApi = require('./rest-api')
const httpServer = initApi({dbUrl: 'mongodb://localhost:27017'})

httpServer.listen(3000, () => console.log(`Listening on http://localhost:3000`))