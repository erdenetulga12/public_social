const jwt = require('jsonwebtoken')

function getUserId(context) {
  let Authorization
  if (context.request) {
    Authorization = context.request.get('Authorization')
  } else {
    ;({ Authorization } = context.connection.context)
  }
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    return userId
  }

  throw new AuthError()
}

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

module.exports = {
  getUserId,
  AuthError,
}
