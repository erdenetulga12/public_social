const { getUserId } = require('../utils')

const Post = {
  author: ({ id }, args, context) => {
    return context.prisma.post({ id }).author()
  },
  comments: ({ id }, args, context) => {
    return context.prisma.post({ id }).comments()
  },
  likes: ({ id }, args, context) => {
    return context.prisma.post({ id }).likes()
  },
  userPostLikeId: async ({ id }, args, context) => {
    const userId = getUserId(context)
    const likes = await context.prisma.likes({
      where: {
        post: { id },
        author: { id: userId },
      },
    })
    if (likes.length === 0) return null
    return likes[0].id
  },
  isUserAuthor: async ({ id }, args, context) => {
    const userId = getUserId(context)
    const isAuthor = await context.prisma.$exists.post({
      id,
      author: { id: userId },
    })
    return isAuthor
  },
}

module.exports = {
  Post,
}
