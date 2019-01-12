const { getUserId } = require('../../utils')

const comment = {
  async createComment(parent, { postId, content }, context) {
    const userId = getUserId(context)
    return context.prisma.createComment({
        post: { connect: { id: postId }},
      content,
      author: { connect: { id: userId } },
    })
  },
  async deleteComment(parent, { commentId }, context) {
    const userId = getUserId(context)
    const commentExists = await context.prisma.$exists.comment({
        id: commentId,
        author: { id: userId }
    })
    if (!commentExists) {
        throw new Error(`Post not found or you're not the author`)
      }
        return context.prisma.deleteComment({
            id: commentId
        })
  }
}

module.exports = { comment }