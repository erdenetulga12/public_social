import React, { Component, Fragment } from 'react'
import { graphql, compose, Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { gql } from 'apollo-boost'
import Comment from './Comment'
import CreateComment from './CreateComment'
import { FEED_QUERY } from './FeedListPage'
import { POSTS_PER_PAGE } from '../constant'

class DetailPage extends Component {
  constructor(props) {
    super(props)
    this.dislike = this.dislike.bind(this)
    this.likePost = this.likePost.bind(this)
    this.likeComment = this.likeComment.bind(this)
    this.handleComment = this.handleComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
  }

  async dislike(likeId) {
    await this.props.dislike({
      variables: {
        likeId,
      },
    })
    this.props.postQuery.refetch()
  }

  async likePost() {
    await this.props.likePost({
      variables: {
        postId: this.props.match.params.id,
      },
    })
    this.props.postQuery.refetch()
  }

  async deleteComment(commentId) {
    await this.props.deleteComment({
      variables: {
        commentId,
      },
    })
    this.props.postQuery.refetch()
  }

  handleComment = async content => {
    await this.props.createComment({
      variables: {
        postId: this.props.match.params.id,
        content,
      },
    })
    this.props.postQuery.refetch()
  }

  async likeComment(commentId) {
    await this.props.likeComment({
      variables: {
        commentId,
      },
    })
    this.props.postQuery.refetch()
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
        <h1 className="f2 white-80 fw4 lh-solid">
          {post.title} &nbsp;{post.isUserAuthor ? action : null}
        </h1>
        <p className="f4 white-80 fw3">{post.content}</p>
        <p className="white-80 fw3">{post.likes.length}</p>
        {post.isUserAuthor ? null : (
          <p>
            {post.userPostLikeId ? (
              <a
                className="f6 dim br1 ba ph3 pv2 mb2 dib"
                onClick={() => this.dislike(post.userPostLikeId)}
              >
                Dislike
              </a>
            ) : (
              <a
                className="f6 dim br1 ba ph3 pv2 mb2 dib"
                onClick={() => this.likePost()}
              >
                Like
              </a>
            )}
          </p>
        )}
        <CreateComment handleComment={this.handleComment} />
        {post.comments.map(comment => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              likeComment={this.likeComment}
              dislike={this.dislike}
              deleteComment={this.deleteComment}
            />
          )
        })}
      </Fragment>
    )
  }

  _renderAction = ({ id, published }) => {
    if (!published) {
      return (
        <Fragment>
          <Mutation
            mutation={PUBLISH_MUTATION}
            variables={{ id }}
            onCompleted={() => this.props.history.push('/new/1')}
            update={(store, { data: { post } }) => {
              const first = POSTS_PER_PAGE
              const skip = 0
              const orderBy = 'createdAt_DESC'
              const data = store.readQuery({
                query: FEED_QUERY,
                variables: { first, skip, orderBy },
              })
              data.feed.links.unshift(post)
              store.writeQuery({
                query: FEED_QUERY,
                data,
                variables: { first, skip, orderBy },
              })
            }}
          >
            {postMutation => (
              <a
                className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
                onClick={postMutation}
              >
                Publish
              </a>
            )}
          </Mutation>{' '}
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
  query postQuery($id: ID!) {
    post(id: $id) {
      id
      title
      content
      published
      author {
        name
      }
      comments {
        id
        content
        userCommentLikeId
        isUserAuthor
        likes {
          id
        }
        author {
          name
        }
      }
      likes {
        id
        author {
          name
        }
      }
      userPostLikeId
      isUserAuthor
    }
  }
`

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
    }
  }
`

const LIKE_COMMENT_MUTATION = gql`
  mutation likeComment($commentId: ID!) {
    likeComment(commentId: $commentId) {
      id
    }
  }
`

const DISLIKE_MUTATION = gql`
  mutation dislike($likeId: ID!) {
    dislike(likeId: $likeId) {
      id
    }
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
const CREATE_COMMENT_MUTATION = gql`
  mutation CreateCommentMutation($content: String!, $postId: ID!) {
    createComment(content: $content, postId: $postId) {
      content
    }
  }
`

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      id
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
      fetchPolicy: 'network-only',
    }),
  }),
  graphql(PUBLISH_MUTATION, {
    name: 'publishDraft',
  }),
  graphql(CREATE_COMMENT_MUTATION, {
    name: 'createComment',
  }),
  graphql(DELETE_COMMENT_MUTATION, {
    name: 'deleteComment',
  }),
  graphql(DELETE_MUTATION, {
    name: 'deletePost',
  }),
  graphql(LIKE_POST_MUTATION, {
    name: 'likePost',
  }),
  graphql(LIKE_COMMENT_MUTATION, {
    name: 'likeComment',
  }),
  graphql(DISLIKE_MUTATION, {
    name: 'dislike',
  }),
  withRouter,
)(DetailPage)
