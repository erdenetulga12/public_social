const { GraphQLServer } = require('graphql-yoga')
const express = require('express')
const path = require('path')
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

const options = {
  endpoint: '/graphql'
}

server.express.use(express.static('public'))

server.express.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

server.start(options, () => console.log('Server is running on http://localhost:4000'))
