import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

class ChatListPage extends Component {
  constructor(props) {
    super(props)
    this.deleteChat = this.deleteChat.bind(this)
  }

  async deleteChat(chatId) {
    await this.props.deleteChat({
      variables: {
        chatId,
      },
    })
  }

  render() {
    if (this.props.chats.loading) return <div />
    return (
      <Fragment>
        
        <h1>Chats</h1>
        {this.props.chats.chats.map(chat => {
          return (
            <Fragment>
              <Link key={chat.id} to={`chat/${chat.id}`}>
                {chat.name}
              </Link>
              &nbsp;
              <strong>by {chat.author.name}</strong>
              <button onClick={() => this.deleteChat(chat.id)}>Delete</button>
            </Fragment>
          )
        })}
      </Fragment>
    )
  }
}

const CHATS_QUERY = gql`
  query chats {
    chats {
      id
      name
      isUserAuthor
      author {
        name
      }
    }
  }
`

const DELETE_CHAT = gql`
  mutation deleteChat($chatId: ID!) {
    deleteChat(chatId: $chatId) {
      name
    }
  }
`

export default withRouter(
  compose(
    graphql(CHATS_QUERY, {
      name: 'chats',
    }),
    graphql(DELETE_CHAT, {
      name: 'deleteChat',
    }),
  )(ChatListPage),
)
