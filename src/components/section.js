import React from 'react'

export default class Section extends React.Component {
  render() {
    return (
      <h1>Section #{this.props.params.id}</h1>
    )
  }
}