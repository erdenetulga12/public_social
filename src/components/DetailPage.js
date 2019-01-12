import React, { Component, Fragment } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import  { gql } from 'apollo-boost'
import Comment from './Comment'

class DetailPage extends Component {
  constructor(props){
    super(props)
    this.dislikePost = this.dislikePost.bind(this)
    this.likePost = this.likePost.bind(this)
  }

  async dislikePost(){
    await this.props.dislike({
      id: "ABCDE"
    })
  }

  async likePost() {
    await this.props.likePost({
      variables: {
        postId: this.props.match.params.id
      }
    })
  }

  render() {
    if (this.props.postQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    const { post } = this.props.postQuery

    let action = this._renderAction(post)

    return (
      <Fragment>
        <h1 className="f3 black-80 fw4 lh-solid">{post.title}</h1>
        <p className="black-80 fw3">{post.content}</p>
        <p className="black-80 fw3">{post.likes.length}</p>
        <p>{post.isLikedByUser ? <a  className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer" onClick={() => this.likePost()}>
            Like
          </a> : <a  className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer" onClick={() => this.dislike()}>
            Dislike
          </a>}</p>
        
          
        {post.comments.map(comment => {
          return (<Comment key={comment.id} comment={comment}/>)
        })}
        {action}
      </Fragment>
    )
  }

  _renderAction = ({ id, published }) => {
    if (!published) {
      return (
        <Fragment>
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.publishDraft(id)}
          >
            Publish
          </a>{' '}
          <a
            className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
            onClick={() => this.deletePost(id)}
          >
            Delete
          </a>
        </Fragment>
      )
    }
    return (
      <a
        className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
        onClick={() => this.deletePost(id)}
      >
        Delete
      </a>
    )
  }

  deletePost = async id => {
    await this.props.deletePost({
      variables: { id },
    })
    this.props.history.replace('/')
  }

  publishDraft = async id => {
    await this.props.publishDraft({
      variables: { id },
    })
    this.props.history.replace('/')
  }
}

const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      content
      published
      author {
        name
      }
      comments {
        content
        author{
          name
        }
      }
      likes{
        id
        author{
          name
        }
      }
      isLikedByUser
    }
  }
`

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    id
  }
`

const DISLIKE_MUTATION = gql`
  mutation dislike($likeId: ID!) {
    id
  }
`

const PUBLISH_MUTATION = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
      published
    }
  }
`

const DELETE_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(POST_QUERY, {
    name: 'postQuery',
    options: props => ({
      variables: {
        id: props.match.params.id,
      },
    }),
  }),
  graphql(PUBLISH_MUTATION, {
    name: 'publishDraft',
  }),
  graphql(DELETE_MUTATION, {
    name: 'deletePost',
  }),
  graphql(LIKE_POST_MUTATION, {
    name: 'likePost',
  }),
  graphql(DISLIKE_MUTATION, {
    name: 'dislike',
  }),
  withRouter,
)(DetailPage)
