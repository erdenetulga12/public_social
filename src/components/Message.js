import React, { Fragment } from 'react'

export default function Message(props) {
  return (
    <article
      className="bb b--black-10"
      style={{
        alignItems: 'flex-end',
      }}
    >
      <div className="flex flex-column flex-row-ns">
        <div className="w-100 w-60-ns pl3-ns">
          <p className="f6 f5-l lh-copy">
            {props.message.content}
            {props.message.isUserAuthor ? (
              <Fragment>
                <button onClick={() => props.messageDelete(props.message.id)}>
                  Delete
                </button>
                <button onClick={() => props.messageEdit(props.message)}>
                  Edit
                </button>
              </Fragment>
            ) : null}
          </p>
          <p className="f6 lh-copy mv0">By {props.message.author.name}</p>
        </div>
      </div>
    </article>
  )
}
