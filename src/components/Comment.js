import React, { Component } from 'react'

export default class Comment extends Component {
  render() {
    return (
        <article className="bb b--black-10">
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-60-ns pl3-ns">
              <p className="f6 f5-l lh-copy">{this.props.comment.content}</p>
              <p className="f6 lh-copy mv0">By {this.props.comment.author.name}</p>
            </div>
          </div>
        </article>
    )
  }
}
