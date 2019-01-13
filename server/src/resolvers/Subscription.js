const Subscription = {
  feedSubscription: {
    subscribe: async (parent, args, context) => {
      return context.prisma.$subscribe.post({
          mutation_in: ['CREATED', 'UPDATED'],
        }).node()
    },
    resolve: payload => {
      return payload
    },
  },
  chatSubscription: {
    subscribe: async (parent, { chatId }, context) => {
      const message = await context.prisma.$subscribe.message({
          node:{
            chat:{
              id: chatId
            }
          }
        }).node()
      return message
    },
    resolve: payload => {
      return payload
    },
  },
}

module.exports = { Subscription }
