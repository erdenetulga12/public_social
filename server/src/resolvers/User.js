const User = {
  posts: ({ id }, args, context) => {
    return context.prisma.user({ id }).posts()
  },
  comments: ({ id }, args, context) => {
    return context.prisma.user({ id }).comments()
  },
  likes: ({ id }, args, context) => {
    return context.prisma.user({ id }).likes()
  },
  myChats: ({ id }, args, context) => {
    return context.prisma.user({ id }).myChats()
  },
  chats: ({ id }, args, context) => {
    return context.prisma.user({ id }).chats()
  },
  messages: ({ id }, args, context) => {
    return context.prisma.user({ id }).messages()
  },
}

module.exports = {
  User,
}
