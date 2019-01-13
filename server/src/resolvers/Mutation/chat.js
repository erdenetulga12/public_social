const { getUserId } = require('../../utils')

const chat = {
  async createChat(parent, { name }, context) {
    const userId = getUserId(context)
    console.log(name)
    return context.prisma.createChat({
      name,
      author: { connect: { id: userId } },
      users: { connect: { id: userId } },
    })
  },
  async deleteChat(parent, { chatId }, context) {
    const userId = getUserId(context)
    const chatExists = await context.prisma.$exists.chat({
        id: chatId,
        author: { id: userId }
    })
    if (!chatExists) {
        throw new Error(`Chat not found or you're not the author`)
      }
        return context.prisma.deleteChat({
            id: chatId
        })
  },
  async addtoChat(parent, {chatId, userId}, context) {
    const chatExists = await context.prisma.$exists.chat({
      id: chatId
  })
  const userExists = await context.prisma.$exists.user({
    id: userId
  })
  if (!chatExists) {
    throw new Error(`Chat not found`)
  }
  if (!userExists) {
    throw new Error(`User not found`)
  }
    return context.prisma.updateChat({
      data:{
        users: {
          connect: {
            id: userId
          }
        }
      },
      where:{
        id: chatId
      }
    })
  }
}

module.exports = { chat }