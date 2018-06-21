const auth = require('../../utils/authentication')
const me = require('./me')
const publicKey = require('./publicKey')

module.exports = {
  me,
  users: (parent, args, ctx, info) => {
    // console.log(ctx.request.headers)
    const token = auth.getIdToken(ctx)
    if (token) return ctx.connectors.userService.query.users({}, info)
  },
  teams: (parent, args, ctx, info) => {
    const token = auth.getIdToken(ctx)
    if (token) return ctx.connectors.userService.query.teams({}, info)
  },
  publicKey
}
