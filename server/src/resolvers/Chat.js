const { getUserId } = require('../utils')

const Chat = {
  author: ({ id }, args, context) => {
    return context.prisma.chat({ id }).author()
  },
  users: ({ id }, args, context) => {
    return context.prisma.chat({ id }).users()
  },
  messages: ({ id }, args, context) => {
    return context.prisma.chat({ id }).messages()
  },
  isUserAuthor: async ({ id }, args, context) => {
    const userId = getUserId(context)
    const isAuthor = await context.prisma.$exists.chat({
      id,
      author: { id: userId },
    })
    return isAuthor
  },
}

module.exports = {
  Chat,
}
