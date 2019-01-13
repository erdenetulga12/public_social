import React, { Component, Fragment } from 'react'

export default class CreateComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
          }
    }
    

    render() {
        return (
        <Fragment>
        <h1> Comment </h1>
        <textarea
        className="db w-100 ba bw1 b--black-20 pa2 br2 mb2"
        cols={50}
        onChange={e => this.setState({ content: e.target.value })}
        placeholder="Content"
        rows={2}
        value={this.state.content}
         />
         <input
            className={`pa3 bg-black-10 bn ${this.state.content && 'dim pointer'}`}
            disabled={!this.state.content}
            type="submit"
            value="Add Comment" 
            onClick={() => this.props.handleComment(this.state.content)}
          />
        </Fragment>
        )
}
}