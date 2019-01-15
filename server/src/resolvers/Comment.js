const { getUserId } = require('../utils')

const Comment = {
  author: ({ id }, args, context) => {
    return context.prisma.comment({ id }).author()
  },
  likes: ({ id }, args, context) => {
    return context.prisma.comment({ id }).likes()
  },
  userCommentLikeId: async ({ id }, args, context) => {
    const userId = getUserId(context)
    const likes = await context.prisma.likes({
      where: {
        comment: { id },
        author: { id: userId },
      },
    })
    if (likes.length === 0) return null
    return likes[0].id
  },
  isUserAuthor: async ({ id }, args, context) => {
    const userId = getUserId(context)
    const isAuthor = await context.prisma.$exists.comment({
      id,
      author: { id: userId },
    })
    return isAuthor
  },
}

module.exports = {
  Comment,
}
