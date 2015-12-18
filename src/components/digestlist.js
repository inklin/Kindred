import React from 'react'

export default class DigestList extends React.Component {

  render() {
    return (
      <div>
        <h1 onClick={this.test.bind(this)}>DigestList</h1>
        <input ref='test'/>
      </div>
    )
  }
}