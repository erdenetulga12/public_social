const { getUserId } = require('../utils')

const Query = {
  feed(parent, args, context) {
    return context.prisma.posts({ where: { published: true } })
  },
    // const where = args.filter
    //   ? {
    //       OR: [
    //         { title_contains: args.filter },
    //         { content_contains: args.filter },
    //         { published: true },
    //       ],
    //     }
    //   : {
    //       OR: [{ published: true }],
    //     }

    // const posts = context.prisma.posts({
    //   where,
    //   skip: args.skip,
    //   first: args.first,
    //   orderBy: args.orderBy
    // })
    // const count = context.prisma.postsConnection({
    //   where,
    // })
    // .aggregate()
    // .count()
    // return {
    //   posts,
    //   count,
    // },
  //},
  drafts(parent, args, context) {
    const id = getUserId(context)
    const where = {
      published: false,
      author: {
        id,
      },
    }
    return context.prisma.posts({ where })
  },
  post(parent, { id }, context) {
    return context.prisma.post({ id })
  },
  comment(parent, { id }, context) {
    return context.prisma.comment({ id })
  },
  me(parent, args, context) {
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
  chat(parent, { chatId }, context) {
    return context.prisma.chat({ id: chatId })
  },
  chats(parent, args, context) {
    return context.prisma.chats()
  },
  messages(parent, args, context) {
    return context.prisma.messages()
  },
  users(parent, args, context) {
    const userId = getUserId(context)
    return context.prisma.users({
      where: {
        id_not: userId,
      },
    })
  },
}

module.exports = { Query }
