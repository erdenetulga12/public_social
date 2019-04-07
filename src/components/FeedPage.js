import React, { Fragment } from 'react'
import { compose, graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import 'url-search-params-polyfill'
import Post from './Post'

class FeedPage extends React.Component {
  constructor(props) {
    super(props)
    this.pagePusher = this.pagePusher.bind(this)
    this.searchPusher = this.searchPusher.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  state = {
    searcher: '',
    selected: '',
  }

  searchPusher(content) {
    const search = new URLSearchParams()
    search.set('sear', content)
    this.props.history.push({
      pathname: this.props.location.path,
      search: `?${search.toString()}`,
    })
  }

  pagePusher(pageNumber) {
    const search = new URLSearchParams()
    search.set('page', pageNumber)
    this.props.history.push({
      pathname: this.props.location.path,
      search: `?${search.toString()}`,
    })
  }

  _nextPage = data => {
    const search = new URLSearchParams(this.props.location.search)
    const page = search.get('page')
    let l = 0
    l = Math.ceil(this.props.feedQuery.feedlist.count / 5)-1
    if (page <= l) {
      const nextPage = +page + +1
      this.props.history.push(`/?page=${nextPage}`)
    }
  }

  _previousPage = () => {
    const search = new URLSearchParams(this.props.location.search)
    const page = search.get('page')
    if (page > 1) {
      const previousPage = page - 1
      this.props.history.push(`/?page=${previousPage}`)
    }
  }

  async onChangeHandler(e, input) {
    await this.setState({ searcher: e.target.value, selected: input })
    this.searchPusher(this.state.searcher)
  }

  render() {
    if (this.props.feedQuery.loading) {
      return <div>Loading ...</div>
    }

    const a = []
    for (
      let l = 0;
      l < Math.ceil(this.props.feedQuery.feedlist.count / 5);
      l += 1
    ) {
      a[l] = ''
    }
    return (
      <Fragment>
        <input
          key="input"
          className="flex db w-20 ba bw1 b--black-20 pa2 br2 mb2"
          onChange={(e, key) => this.onChangeHandler(e, key)}
          placeholder="Search"
          value={this.state.searcher}
        />
        <div>
          {this.props.feedQuery.feedlist.posts.map(post => (
            <Post
              key={post.id}
              post={post}
              refresh={() => this.props.feedQuery.refetch()}
            />
          ))}
        </div>
        <div className="flex ml4 mv3 gray">
          {/* {a.map((v, i) => {
            return (
              <div
                className="pointe mr2"
                onClick={() => this.pagePusher(i + 1)}
              >
                {i + 1}
              </div>
            )
          })} */}
          <div className="pointer mr2" onClick={this._previousPage}>
            Previous
          </div>
          <div className="pointer" onClick={() => this._nextPage(this.props.feedQuery.feedlist.count)}>
            Next
          </div>
        </div>
      </Fragment>
    )
  }
}

const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $filter: String) {
    feedlist(first: $first, skip: $skip, filter: $filter) {
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

export default compose(
  graphql(FEED_QUERY, {
    name: 'feedQuery',
    options: props => {
      const search = new URLSearchParams(props.location.search)
      const page = search.get('page') || 1
      const sear = search.get('sear') || ''
      console.log(props.sear)
      return {
        fetchPolicy: 'network-only',
        variables: {
          first: 5,
          skip: (page - 1) * 5,
          filter: sear,
        },
      }
    },
  }),
)(FeedPage)
