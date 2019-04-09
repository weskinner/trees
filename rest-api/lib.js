const googleClientId = '146370768632-uvb7hbnqgnrrkor1ng5lrpphnk34opdl.apps.googleusercontent.com'
const {OAuth2Client} = require('google-auth-library')
const gApiClient = new OAuth2Client(googleClientId)

module.exports = {
  auth: async function verifyIdToken(token) {
    if (process.env.NODE_ENV == 'production') {
      const ticket = await gApiClient.verifyIdToken({
          idToken: token,
          audience: googleClientId
      })
      const payload = ticket.getPayload()
      const userId = payload['sub']
      const clientId = payload['aud']
      const expiresAt = payload['exp']

      if (clientId != googleClientId) {
        throw new AuthError("Verify failed.  Client ID should match env config. Seeing " + clientId)
      } else if ((Date.now()/1000) > expiresAt) {
        throw new AuthError("Verify failed. Token is expired.")
      }
      console.log('Token verified.')

      console.log('Looking for profile.')
      var profile = await db.collection('profiles').findOne({'uid': userId});
      if(profile) {
        console.log('Profile found.')
      } else {
        console.log('Creating profile.')
        profile = await db.collection('profiles').insertOne({uid: userId})
      }

      return profile
    } else {
      return 1
    }

  },

  asyncHandler: function asyncHandler(fn) {
    return function asyncHandlerMiddleware(req, res, next) {
      Promise
      .resolve(fn(req, res, next))
      .catch(next)
    }
  }
}

class AuthError extends Error {
  constructor(...params) {
    super(...params);
    this.name = 'AuthError';
  }
}