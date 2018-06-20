const auth = require('../../utils/authentication')

module.exports = (parent, args, ctx) => {
  const token = auth.getIdToken(ctx)

  return ctx.connectors.userService.query.user({
    where: {
      id: token.userId
    }
  })
}
