const bcrypt = require('bcrypt')
const auth = require('../../utils').authentication

module.exports = async (root, args, ctx) => {
  const user = await ctx.connectors.userService.query.user({
    where: {
      email: args.email
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const validPassword = await bcrypt.compare(args.password, user.password)

  if (!validPassword) {
    throw new Error('Invalid password')
  }

  return auth.signPayload({
    id: user.id
  })
}
