import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Post extends Component {
  render() {
    let title = this.props.post.title
    if (this.props.isDraft) {
      title = `${title} (Draft)`
    }

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-9">
            <h1 className="f3 fw1 baskerville mt0 lh-title">{title}</h1>
            <p className="f6 f5-l lh-copy">{this.props.post.content}</p>
            <p className="f6 lh-copy mv0">By {this.props.post.author.name}</p>
          </div>
          <div className="col-md-3">
            <Link
              to={`/post/${this.props.post.id}`}
              className="btn btn-secondary"
            >
              Post Details
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
