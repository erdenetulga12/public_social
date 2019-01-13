const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { like } = require('./Mutation/like')
const { comment } = require('./Mutation/comment')
const { chat } = require('./Mutation/chat')
const { message } = require('./Mutation/message')

const { Subscription } = require('./Subscription')
const { User } = require('./User')
const { Post } = require('./Post')
const { Comment } = require('./Comment')
const { Like } = require('./Like')
const { Chat } = require('./Chat')
const { Message } = require('./Message')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...post,
    ...like,
    ...comment,
    ...chat,
    ...message,
    
  },
  Subscription,
  User,
  Post,
  Comment,
  Like,
  Chat,
  Message,
}