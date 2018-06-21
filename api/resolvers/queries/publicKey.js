const auth = require('../../utils').authentication

module.exports = () => {
  return auth.publicKey()
}
