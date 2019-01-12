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
  isLikedByUser: async ({id}, args, context) => {
    const userId = getUserId(context)
    const isLikedByUser = await context.prisma.$exists.like({
      post: { id },
      author: { id: userId}
    })
    return isLikedByUser
  }
}

module.exports = {
  Post
}