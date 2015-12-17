import React from 'react'

export default class Digest extends React.Component {
  render() {
    return (
      <h1>Digest #{this.props.params.id}</h1>
    )
  }
}