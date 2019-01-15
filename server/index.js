const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./src/generated/prisma-client')
const resolvers = require('./src/resolvers')

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.start(() => console.log('Server is running on http://localhost:4000'))