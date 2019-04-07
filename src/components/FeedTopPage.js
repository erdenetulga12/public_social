import React, { Component, Fragment } from 'react'
import Post from './Post'
import { graphql, Query } from 'react-apollo'
import { gql } from 'apollo-boost'

export const FEED_QUERY = gql`
  query FeedQuery($orderBy: PostOrderByInput) {
    feedlist(orderBy: $orderBy) {
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
  }
`

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

class FeedTop extends Component {
  _updateCacheAfterLike = (store, createLike, postId) => {
    const data = store.readQuery({
      query: FEED_QUERY,
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
            __typename: prev.feedlist.__typename,
          },
        })
      },
    })
  }

  _getPostsToRender = data => {
    const rankedPosts = data.feedlist.posts.slice()
    rankedPosts.sort((l1, l2) => l2.likes.length - l1.likes.length)
    return rankedPosts
  }

  _getQueryVariables = () => {
    const orderBy = 'createdAt_DESC'
    return { orderBy }
  }

  render() {
    return (
      <Query query={FEED_QUERY} variables={this._getQueryVariables()}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          this._subscribeToNewPosts(subscribeToMore)

          const postsToRender = this._getPostsToRender(data)

          return (
            <Fragment>
              {postsToRender.map((post, index) => (
                <Post
                  key={post.id}
                  post={post}
                  refresh={() => this.props.feedQuery.refetch()}
                />
              ))}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default graphql(FEED_QUERY, {
  name: 'feedQuery', // name of the injected prop: this.props.feedQuery...
  options: props => {
    console.log(props.location, 'location')
    console.log(props.match, 'match')
    return {
      fetchPolicy: 'network-only',
    }
  },
})(FeedTop)
