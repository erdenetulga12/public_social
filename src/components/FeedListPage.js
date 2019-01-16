import React, { Component, Fragment } from 'react'
import Post from './Post'
import { graphql, Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { POSTS_PER_PAGE } from '../constant'

export const FEED_QUERY = gql`
query FeedQuery($first: Int, $skip: Int, $orderBy: PostOrderByInput) {
  feedlist(first: $first, skip: $skip, orderBy: $orderBy) {
    posts {
      id
      createdAt
      content
      title
      author {
        id
        name
      }
      likes {
        id
        author {
          id
        }
      }
    }
    count
  }
}`

const NEW_POSTS_SUBSCRIPTION = gql`
  subscription {
    feedSubscription {
      node {
        id
        content
        title
        createdAt
        author {
          id
          name
        }
        likes {
          id
          author {
            id
          }
        }
      }
    }
  }
`

class FeedList extends Component {
  _updateCacheAfterLike = (store, createLike, postId) => {
    const isNewPage = this.props.location.pathname.includes('new')
    const page = parseInt(this.props.match.params.page, 10)

    const skip = isNewPage ? (page - 1) * POSTS_PER_PAGE : 0
    const first = isNewPage ? POSTS_PER_PAGE : 100
    const orderBy = isNewPage ? 'createdAt_DESC' : null
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { first, skip, orderBy }
    })

    const likedPost = data.feedlist.posts.find(post => post.id === postId)
    likedPost.likes = createLike.post.likes
    store.writeQuery({ query: FEED_QUERY, data })
  }

  _subscribeToNewPosts = subscribeToMore => {
    subscribeToMore({
      document: NEW_POSTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newPost = subscriptionData.data.feedSubscription.node

        return Object.assign({}, prev, {
          feedlist: {
            posts: [newPost, ...prev.feedlist.posts],
            count: prev.feedlist.posts.length + 1,
            __typename: prev.feedlist.__typename
          }
        })
      }
    })
  }

  _getQueryVariables = () => {
    const isNewPage = this.props.location.pathname.includes('new')
    const page = parseInt(this.props.match.params.page, 10)

    const skip = isNewPage ? (page - 1) * POSTS_PER_PAGE : 0
    const first = isNewPage ? POSTS_PER_PAGE : 100
    const orderBy = isNewPage ? 'createdAt_DESC' : null
    return { first, skip, orderBy }
  }

  _getPostsToRender = data => {
    const isNewPage = this.props.location.pathname.includes('new')
    if (isNewPage) {
      return data.feedlist.posts
    }
    const rankedPosts = data.feedlist.posts.slice()
    rankedPosts.sort((l1, l2) => l2.likes.length - l1.likes.length)
    return rankedPosts
  }

  _nextPage = data => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page <= data.feedlist.count / POSTS_PER_PAGE) {
      const nextPage = page + 1
      this.props.history.push(`/new/${nextPage}`)
    }
  }

  _previousPage = () => {
    const page = parseInt(this.props.match.params.page, 10)
    if (page > 1) {
      const previousPage = page - 1
      this.props.history.push(`/new/${previousPage}`)
    }
  }

  render() {
    return (
      <Query query={FEED_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          this._subscribeToNewPosts(subscribeToMore)

          const postsToRender = this._getPostsToRender(data)
          const isNewPage = this.props.location.pathname.includes('new')
          const pageIndex = this.props.match.params.page
            ? (this.props.match.params.page - 1) * POSTS_PER_PAGE
            : 0

          return (
            <Fragment>
              {postsToRender.map((post, index) => (
                <Post
                  key={post.id}
                  post={post}
                  refresh={() => this.props.feedQuery.refetch()}
                  index={index + pageIndex}
                />
              ))}
              {isNewPage && (
                <div className="flex ml4 mv3 gray">
                  <div className="pointer mr2" onClick={this._previousPage}>
                    Previous
                  </div>
                  <div className="pointer" onClick={() => this._nextPage(data)}>
                    Next
                  </div>
                </div>
              )}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default graphql(FEED_QUERY, {
  name: 'feedQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
})(FeedList)