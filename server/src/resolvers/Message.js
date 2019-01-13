const { getUserId } = require('../utils')

const Message = {
    author: ({ id }, args, context) => {
      return context.prisma.message({ id }).author()
    },
    chat: ({ id }, args, context) => {
      return context.prisma.message({ id }).chat()
    },
    isUserAuthor: async ({ id }, args, context) => {
      const userId = getUserId(context)
      const isAuthor = await context.prisma.$exists.message({
          id,
          author: { id: userId }
      })
      return isAuthor
    },
  }
  
  module.exports = {
      Message,
  }