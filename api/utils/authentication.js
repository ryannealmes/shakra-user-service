// TODO - rather use private/public key signing and expose public key from this repo
// That way connecting services can jsut make a request and retrieve the key and cache it
// https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback

const jwt = require('jsonwebtoken')
const AuthError = require('../errors/authError')
const fs = require('fs')

const getIdToken = ctx => {
  const Authorization = ctx.request.get('Authorization')

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const cert = fs.readFileSync('keys/public.key', 'utf8')
    return jwt.verify(token, cert)
  }

  throw new AuthError()
}

const signPayload = payload => {
  const cert = fs.readFileSync('keys/private.key', 'utf8')

  return jwt.sign(payload, cert, {
    algorithm: 'RS256'
  })
}

// TODO - investigate using JSON Web Keys
// https: //tools.ietf.org/html/rfc7517#section-4.5
// https://auth0.com/docs/jwks#using-the-jwks-in-your-application-to-verify-a-jwt
// const jwk = () => {
//   const pem = fs.readFileSync('keys/private.key', 'utf8')

//   const jwk = rsaPemToJwk(pem, {
//     use: 'sig',
//     alg: 'RS256',
//     kty: 'RSA',
//     x5c: [pem]
//   }, 'public')

//   return jwk
// }

const publicKey = () => {
  return fs.readFileSync('keys/public.key', 'utf8')
}

const authenticateUser = getIdToken

module.exports = {
  getIdToken,
  signPayload,
  authenticateUser,
  publicKey
}
