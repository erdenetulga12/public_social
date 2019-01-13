import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { compose, graphql } from 'react-apollo'
import  { gql } from 'apollo-boost'

class ChatListPage extends Component {



    render() {
        if(this.props.chats.loading) return (<div></div>)
        return (
            <Fragment>
                <h1>Chats</h1>
                {this.props.chats.chats.map(
                    chat => {
                        return (
                            <Fragment>
                            <Link key={chat.id} to={`chat/${chat.id}`}> 
                                {chat.name}
                            </Link>
                            &nbsp;
                            <strong>by {chat.author.name}</strong>
                            </Fragment>
                        )
                    }
                )
                }
                
            </Fragment>
        )
    }
}

const CHATS_QUERY = gql`
query chats{
  chats{
    id
    name
    author{
      name
    }
  }
}`

export default withRouter(
    compose(
        graphql(CHATS_QUERY, {
            name: 'chats'
        })
    )(ChatListPage))