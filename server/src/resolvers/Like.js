const Like = {
  author: ({ id }, args, context) => {
    return context.prisma.like({ id }).author()
  },
}

module.exports = {
  Like,
}
