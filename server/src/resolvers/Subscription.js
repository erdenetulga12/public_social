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
      console.log(chatId, 'ChatID')
      const message = await context.prisma.$subscribe.message({
          where:{
            node:{
              chat:{
                id: chatId
              }
            }
          },
        }).node()
      console.log(message)
      return message
    },
    resolve: payload => {
      return payload
    },
  },
}

module.exports = { Subscription }
