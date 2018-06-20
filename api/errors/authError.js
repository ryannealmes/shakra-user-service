module.exports = class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}
