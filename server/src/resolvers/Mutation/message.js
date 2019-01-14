const { getUserId } = require('../../utils')

const message = {
  async createMessage(parent, { chatId, content }, context) {
    const userId = getUserId(context)
    return context.prisma.createMessage({
      chat: { connect: { id: chatId } },
      content,
      author: { connect: { id: userId } },
    })
  },
  async deleteMessage(parent, { messageId }, context) {
    const userId = getUserId(context)
    const messageExists = await context.prisma.$exists.message({
      id: messageId,
      author: { id: userId },
    })
    if (!messageExists) {
      throw new Error(`Message not found or you're not the author`)
    }
    return context.prisma.deleteMessage({
      id: messageId,
    })
  },
  async editMessage(parent, { messageId, content }, context) {
    const userId = getUserId(context)
    const messageExists = await context.prisma.$exists.message({
      id: messageId,
      author: { id: userId },
    })
    if (!messageExists) {
      throw new Error(`Message not found or you're not the author`)
    }
    return context.prisma.updateMessage({
      where: {
        id: messageId,
      },
      data: {
        content,
      },
    })
  },
}

module.exports = { message }
