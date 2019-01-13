const { getUserId } = require('../../utils')

const like = {
  async likePost(parent, { postId }, context) {
    const userId = getUserId(context)
    const userPost = await context.prisma.$exists.post({
        id: postId,
        author: { id: userId }
    })
    if(userPost) {
        throw new Error(`This post is yours`)
    }
    return context.prisma.createLike({
        post: { connect: { id: postId }},
      author: { connect: { id: userId }},
    })
  },

  async likeComment(parent, { commentId }, context) {
    const userId = getUserId(context)
    const userComment = await context.prisma.$exists.comment({
        id: commentId,
        author: { id: userId }
    })
    if(userComment) {
        throw new Error(`This comment is yours`)
    }
    return context.prisma.createLike({
        comment: { connect: { id: commentId }},
        author: { connect: { id: userId }},
    })
  },

  async dislike(parent, { likeId }, context) {
    const userId = getUserId(context)
    const likeExists = await context.prisma.$exists.like({
        id: likeId,
        author: { id: userId }
    })
    if (!likeExists) {
        throw new Error(`like not found or you're not the author`)
      }
        return context.prisma.deleteLike({
            id: likeId,
        })
  }
}

module.exports = { like }