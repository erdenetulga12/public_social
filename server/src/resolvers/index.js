const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { like } = require('./Mutation/like')
const { comment } = require('./Mutation/comment')
const { Subscription } = require('./Subscription')
const { User } = require('./User')
const { Post } = require('./Post')
const { Comment } = require('./Comment')
const { Like } = require('./Like')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...post,
    ...like,
    ...comment,
  },
  Subscription,
  User,
  Post,
  Comment,
  Like,
}