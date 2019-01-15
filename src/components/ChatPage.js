import React, { Component, Fragment } from 'react'
import Message from './Message'
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'

class ChatPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMessageId: undefined,
      currentMessageContent: '',
    }
    this.messageDelete = this.messageDelete.bind(this)
    this.messageEdit = this.messageEdit.bind(this)
    this.messageSubmit = this.messageSubmit.bind(this)
    this.addUser = this.addUser.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.chatQuery.refetch()
    }
  }

  componentDidMount() {
    this.props.subscribeToNewChat(this.props.match.params)
  }

  async messageDelete(messageId) {
    await this.props.messageDelete({
      variables: {
        messageId,
      },
    })
  }

  messageEdit(message) {
    const { id, content } = message
    this.setState({
      currentMessageId: id,
      currentMessageContent: content,
    })
  }

  async addUser(userId) {
    await this.props.addUser({
      variables: {
        userId,
        chatId: this.props.match.params.chatId,
      },
    })
  }

  async messageSubmit() {
    const { currentMessageContent, currentMessageId } = this.state
    if (currentMessageId) {
      await this.props.messageEdit({
        variables: {
          messageId: currentMessageId,
          content: currentMessageContent,
        },
      })
    } else {
      await this.props.messageCreate({
        variables: {
          chatId: this.props.match.params.chatId,
          content: currentMessageContent,
        },
      })
    }
    this.setState({ currentMessageId: undefined, currentMessageContent: '' })
  }

  render() {
    if (this.props.chatQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <Fragment>
        <h1>Communication</h1>
        {this.props.chatQuery.chat.users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
        <p>ADD USER</p>
        {this.props.users.users
          .filter(
            user =>
              !this.props.chatQuery.chat.users.find(
                item => item.id === user.id,
              ),
          )
          .map(user => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => this.addUser(user.id)}>ADD</button>
            </li>
          ))}
        <p>CHAT</p>
        {this.props.chatQuery.chat &&
          this.props.chatQuery.chat.messages.map(message => (
            <Message
              key={message.id}
              message={message}
              messageDelete={this.messageDelete}
              messageEdit={this.messageEdit}
            />
          ))}
        {this.props.children}
        <textarea
          className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
          cols={50}
          onChange={e =>
            this.setState({ currentMessageContent: e.target.value })
          }
          onKeyPress={e => {
            if (e.key === 'Enter') {
              this.messageSubmit()
            }
          }}
          placeholder="Content"
          rows={8}
          value={this.state.currentMessageContent}
        />
        <button onClick={() => this.messageSubmit()}>
          {this.state.currentMessageId ? 'Update' : 'Send'}
        </button>
      </Fragment>
    )
  }
}

const CHAT_QUERY = gql`
  query chatQuery($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name

      author {
        name
      }
      users {
        id
        name
      }
      messages {
        isUserAuthor
        id
        content
        author {
          name
        }
      }
    }
  }
`
const CHAT_SUBSCRIPTION = gql`
  subscription chatSubscription($chatId: ID!) {
    chatSubscription(chatId: $chatId) {
      id
      content
      isUserAuthor
      author {
        name
      }
    }
  }
`

const USERS = gql`
  {
    users {
      name
      id
    }
  }
`

const MESSAGE_CREATE = gql`
  mutation createMessage($chatId: ID!, $content: String!) {
    createMessage(chatId: $chatId, content: $content) {
      id
    }
  }
`

const MESSAGE_DELETE = gql`
  mutation deleteMessage($messageId: ID!) {
    deleteMessage(messageId: $messageId) {
      content
    }
  }
`
const MESSAGE_EDIT = gql`
  mutation editMessage($messageId: ID!, $content: String!) {
    editMessage(messageId: $messageId, content: $content) {
      id
      content
    }
  }
`

const ADD_USER = gql`
  mutation addtoChat($userId: ID!, $chatId: ID!) {
    addtoChat(userId: $userId, chatId: $chatId) {
      id
      users {
        id
        name
      }
    }
  }
`

export default compose(
  graphql(CHAT_QUERY, {
    name: 'chatQuery',
    options: props => ({
      variables: {
        chatId: props.match.params.chatId,
      },
      fetchPolicy: 'network-only',
    }),
    props: props =>
      Object.assign({}, props, {
        subscribeToNewChat: params => {
          return props.chatQuery.subscribeToMore({
            document: CHAT_SUBSCRIPTION,
            variables: {
              chatId: params.chatId,
            },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) {
                return prev
              }
              const newMessage = subscriptionData.data.chatSubscription
              if (
                prev.chat.messages.find(message => message.id === newMessage.id)
              ) {
                return prev
              }
              return Object.assign({}, prev, {
                chat: {
                  ...prev.chat,
                  messages: [...prev.chat.messages, newMessage],
                },
              })
            },
          })
        },
      }),
  }),
  graphql(MESSAGE_DELETE, {
    name: 'messageDelete',
  }),
  graphql(MESSAGE_EDIT, {
    name: 'messageEdit',
  }),
  graphql(MESSAGE_CREATE, {
    name: 'messageCreate',
  }),
  graphql(USERS, {
    name: 'users',
  }),
  graphql(ADD_USER, {
    name: 'addUser',
  }),
  withRouter,
)(ChatPage)
