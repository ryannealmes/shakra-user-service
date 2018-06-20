const bcrypt = require('bcrypt')
const auth = require('../../utils').authentication

module.exports = async (root, args, ctx) => {
  const {
    username,
    email,
    name,
    password
  } = args

  const exists = await ctx.connectors.userService.exists.User({
    OR: [{
        email: args.email
      },
      {
        username: args.username
      }
    ]
  })

  if (exists) {
    throw new Error('Account already exists')
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await ctx.connectors.userService.mutation.createUser({
    data: {
      username,
      email,
      name,
      password: hash
    }
  }, '{ id }')

  return auth.signPayload({
    id: user.id
  })
}
