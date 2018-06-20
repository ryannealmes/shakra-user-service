const auth = require('../../utils').authentication

module.exports = (parent, args, ctx) => {
  return auth.publicKey()
}
