module.exports = async (root, args, ctx) => {
  return await ctx.connectors.userService.mutation.updateUser({
    where: {
      id: args.input.userId
    },
    data: {
      teams: {
        connect: args.input.teamId
      }
    }
  })
}
