import React from 'react'
import Section from './digest/section'

export default class SectionContainer extends React.Component {
  render() {
    return (
      <div>
        Section #{this.props.params.id}
        <Section />
      </div>
    )
  }
}