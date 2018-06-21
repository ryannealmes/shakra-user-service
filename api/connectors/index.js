const { Prisma } = require('prisma-binding')

module.exports = {
  userService: new Prisma({
    typeDefs: './generated/prisma.graphql',
    endpoint: 'http://localhost:4467/user-service/development'
  })
}
