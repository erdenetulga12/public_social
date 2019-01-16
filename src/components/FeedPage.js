import React, { Component, Fragment } from 'react'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
//import { POSTS_PER_PAGE } from '../constant'

class FeedPage extends Component {

  // _getQueryVariables = () => {
  //   const isNewPage = this.props.location.pathname.includes('new')
  //   const page = parseInt(this.props.match.params.page, 10)
  
  //   const skip = isNewPage ? (page - 1) * POSTS_PER_PAGE : 0
  //   const first = isNewPage ? POSTS_PER_PAGE : 100
  //   const orderBy = isNewPage ? 'createdAt_DESC' : null
  //   return { first, skip, orderBy }
  // }

  // _nextPage = feed => {
  //   const page = parseInt(this.props.match.params.page, 10)
  //   if (page <= feed.feed.count / POSTS_PER_PAGE) {
  //     const nextPage = page + 1
  //     this.props.history.push(`/new/${nextPage}`)
  //   }
  // }
  
  // _previousPage = () => {
  //   const page = parseInt(this.props.match.params.page, 10)
  //   if (page > 1) {
  //     const previousPage = page - 1
  //     this.props.history.push(`/new/${previousPage}`)
  //   }
  // }
  

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.feedQuery.refetch()
    }
  }

  componentDidMount() {
    this.props.subscribeToNewFeed()
  }

  render() {
    if (this.props.feedQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    // const isNewPage = this.props.location.pathname.includes('new')
    // const pageIndex = this.props.match.params.page
    //   ? (this.props.match.params.page - 1) * POSTS_PER_PAGE
    //   : 0

    return (
      <Fragment>
        {/* <Query query={FEED_QUERY} variables={this._getQueryVariables()}></Query> */}
        <h1>Feed</h1>
        {this.props.feedQuery.feed &&
          this.props.feedQuery.feed.map(post => (
            <Post
              key={post.id}
              post={post}
              //index={index + pageIndex}
              refresh={() => this.props.feedQuery.refetch()}
              isDraft={!post.published}
            />
          ))}
        {this.props.children}
        {/* {isNewPage && (
              <div className="flex ml4 mv3 gray">
                <div className="pointer mr2" onClick={this._previousPage}>
                  previous
                </div>
                <div className="pointer" onClick={() => this._nextPage()}>
                  Next
                </div>
              </div>
            )} */}
      </Fragment>
    )
  }
}

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      id
      content
      title
      published
      author {
        name
      }
    }
  }
`
const FEED_SUBSCRIPTION = gql`
  subscription FeedSubscription {
    feedSubscription {
      node {
        id
        content
        title
        published
        author {
          name
        }
      }
    }
  }
`

export default graphql(FEED_QUERY, {
  name: 'feedQuery', // name of the injected prop: this.props.feedQuery...
  options: {
    fetchPolicy: 'network-only',
  },
  props: props =>
    Object.assign({}, props, {
      subscribeToNewFeed: params => {
        return props.feedQuery.subscribeToMore({
          document: FEED_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev
            }
            const newPost = subscriptionData.data.feedSubscription.node
            if (prev.feed.find(post => post.id === newPost.id)) {
              return prev
            }
            return Object.assign({}, prev, {
              feed: [...prev.feed, newPost],
            })
          },
        })
      },
    }),
})(FeedPage)
