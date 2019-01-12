const Comment = {
    author: ({ id }, args, context) => {
      return context.prisma.comment({ id }).author()
    },
  }
  
  module.exports = {
      Comment,
  }