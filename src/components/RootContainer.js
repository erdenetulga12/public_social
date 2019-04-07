import React, { Component, Fragment } from 'react'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import logo from '../assets/icon.jpg'
import FeedInf from './FeedInf'
import FeedTop from './FeedTopPage'
import FeedList from './FeedListPage'
import ChatPage from './ChatPage'
import ChatListPage from './ChatListPage'
import DraftsPage from './DraftsPage'
import CreatePage from './CreatePage'
import DetailPage from './DetailPage'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import PageNotFound from './PageNotFound'
import LogoutPage from './LogoutPage'
import FeedPage from './FeedPage'
import { AUTH_TOKEN } from '../constant'
import { isTokenExpired } from '../helper/jwtHelper'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  return token ? (
    <Route {...rest} render={matchProps => <Component {...matchProps} />} />
  ) : (
    <Redirect to="/login" />
  )
}

class RootContainer extends Component {
  constructor(props) {
    super(props)
    this.refreshTokenFn = this.refreshTokenFn.bind(this)

    this.state = {
      token: props.token,
    }
  }

  refreshTokenFn(data = {}) {
    const token = data.AUTH_TOKEN

    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
    } else {
      localStorage.removeItem(AUTH_TOKEN)
    }

    this.setState({
      token: data.AUTH_TOKEN,
    })
  }

  bootStrapData() {
    try {
      const token = localStorage.getItem(AUTH_TOKEN)
      if (token !== null && token !== undefined) {
        const expired = isTokenExpired(token)
        if (!expired) {
          this.setState({ token: token })
        } else {
          localStorage.removeItem(AUTH_TOKEN)
          this.setState({ token: null })
        }
      }
    } catch (e) {
      console.log('')
    }
  }

  //verify localStorage check
  componentDidMount() {
    this.bootStrapData()
  }

  render() {
    return (
      <Router>
        <Fragment>
          {this.renderNavBar()}
          {this.renderRoute()}
        </Fragment>
      </Router>
    )
  }

  renderNavBar() {
    return (
      <nav className="card card-body mb-3">
        <nav className="pa3 pa4-n0s">
          <NavLink
            className="link dim ph3 pv2 f6 f5-ns dib mr3"
            activeClassName="gray"
            exact={true}
            to="/"
            title="Feed"
          >
            <img
              src={logo}
              alt="Unearthing"
              style={{ width: 40, margin: 'auto' }}
            />
          </NavLink>
          <Link to="/top" className="link dim ba ph3 pv2 f6 f5-ns dib mr3">
            Top
          </Link>
          {this.props.data &&
            this.props.data.me &&
            this.props.data.me.email &&
            this.state.token && (
              <Fragment>
                <NavLink
                  className="link dim ba ph3 pv2 f6 f5-ns dib mr3"
                  activeClassName="gray"
                  exact={true}
                  to="/drafts"
                  title="Drafts"
                >
                  Drafts
                </NavLink>
                <NavLink
                  className="link dim ba ph3 pv2 f6 f5-ns dib mr3"
                  activeClassName="gray"
                  exact={true}
                  to="/chat"
                  title="Chats"
                >
                  Chats
                </NavLink>
              </Fragment>
            )}
          {this.state.token ? (
            <div
              onClick={() => {
                this.refreshTokenFn &&
                  this.refreshTokenFn({
                    [AUTH_TOKEN]: null,
                  })
                window.location.href = '/'
              }}
              className="f6 link dim br1 ba ph3 pv2 fr mb2 dib"
            >
              Logout
            </div>
          ) : (
            <Link to="/login" className="f6 link dim br1 ba ph3 pv2 fr mb2 dib">
              Login
            </Link>
          )}
          {this.props.data &&
            this.props.data.me &&
            this.props.data.me.email &&
            this.state.token && (
              <Link
                to="/create"
                className="f6 link dim br1 ba ph3 pv2 fr mb2 dib"
              >
                + Create Draft
              </Link>
            )}
        </nav>
      </nav>
    )
  }

  renderRoute() {
    return (
      <div className="fl w-100 pl4 pr4">
        <Switch>
          <Route exact path="/Inf" component={FeedInf} />
          <Route exact path="/new/:page" component={FeedList} />
          <Route exact path="/" component={FeedPage} />
          <Route exact path="/top" component={FeedTop} />
          <ProtectedRoute
            token={this.state.token}
            exact
            path="/chat"
            component={ChatListPage}
          />
          <ProtectedRoute
            token={this.state.token}
            path="/chat/:chatId"
            component={ChatPage}
          />
          <ProtectedRoute
            token={this.state.token}
            path="/drafts"
            component={DraftsPage}
          />
          <ProtectedRoute
            token={this.state.token}
            path="/create"
            component={CreatePage}
          />
          <ProtectedRoute
            token={this.state.token}
            path="/post/:id"
            component={DetailPage}
          />
          <Route
            token={this.state.token}
            path="/login"
            render={props => <LoginPage refreshTokenFn={this.refreshTokenFn} />}
          />
          <Route
            token={this.state.token}
            path="/signup"
            render={props => (
              <SignupPage refreshTokenFn={this.refreshTokenFn} />
            )}
          />
          <Route path="/logout" component={LogoutPage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    )
  }
}

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      name
    }
  }
`

export default graphql(ME_QUERY, {
  options: {
    errorPolicy: 'all',
  },
})(RootContainer)
