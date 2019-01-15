import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

class ChatListPage extends Component {
  constructor(props) {
    super(props)
    this.deleteChat = this.deleteChat.bind(this)
    this.createChat = this.createChat.bind(this)
    this.state = {
      name:'',
    }
  }


  async createChat(name) {
    await this.props.createChat({
      variables: {
        name,
      },
    })
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
        <textarea
          className="db w-50 ba bw1 b--black-20 pa2 br2 mb2"
          cols={50}
          onChange={e => this.setState({ name: e.target.value })}
          placeholder="Name"
          rows={3}
          value={this.state.name}
        />
        <button onClick={() => this.createChat(this.state.name)}>CREATE CHAT ROOM</button>
        <br/>
        <br/>
        {this.props.chats.chats.map(chat => {
          return (
            <Fragment key={chat.id}>
              <Link to={`chat/${chat.id}`}>{chat.name}</Link>
              &nbsp;
              <strong>by {chat.author.name}</strong>
              {chat.isUserAuthor ? <button onClick={() => this.deleteChat(chat.id)}>Delete</button> : null}
              <br/>
            </Fragment>
          )
        })}
      </Fragment>
    )
  }
}

const CHATS_QUERY = gql`
  query Chats {
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
const CREATE_CHAT = gql`
  mutation createChat($name: String!) {
    createChat(name: $name) {
      id
      name
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
    graphql(CREATE_CHAT, {
      name: 'createChat',
    }),
  )(ChatListPage),
)
