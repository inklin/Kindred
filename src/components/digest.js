import React from 'react'
import Section from './digest/section'

export default class Digest extends React.Component {
  render() {
    return (
      <div class="mdl-grid">
        <Section/>
        <Section/>
        <Section/>
        <Section/>
      </div>
    )
  }
}