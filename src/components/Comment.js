import React, { Component } from 'react'

export default class Comment extends Component {
  render() {
    const { comment, likeComment, dislike, deleteComment } = this.props
    return (
        <article className="bb b--black-10">
          <div className="flex flex-column flex-row-ns">
            <div className="w-100 w-60-ns pl3-ns">
              <p className="f6 f5-l lh-copy">{comment.content}</p>
              <p className="f6 lh-copy mv0">By {comment.author.name}</p>
              <p className="black-80 fw3">{comment.likes.length}</p>
              {comment.isUserAuthor ? 
              <a
              className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer"
              onClick={() => deleteComment(comment.id)}
              >
              Delete
              </a>
               : <p>{comment.userCommentLikeId ? 
              <a  className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer" onClick={() => dislike(comment.userCommentLikeId)}>
            Dislike
          </a> :  <a  className="f6 dim br1 ba ph3 pv2 mb2 dib black pointer" onClick={() => likeComment(comment.id)}>
            Like
          </a>}
          </p>}
            </div>
          </div>
        </article>
    )
  }
}
