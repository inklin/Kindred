import React from 'react'
import SectionContainer from './section-container'
import { connect } from 'react-redux'

class Digest extends React.Component {

  render() {
    let currentDigest = this.props.digests.get(parseInt(this.props.id))
    let sections = []

    currentDigest.get('updates').forEach ((updateID) => {
      this.props.updates.get(updateID).get('sections').forEach ((sectionId) => {

        sections.push(
          <SectionContainer
            id={sectionId}
            key={sectionId}
          />)
      })
    })

    return (
      <span>
        {sections}
      </span>
    )
  }
}

function mapState(state){
  return {
    digests: state.content.digests,
    updates: state.content.updates,
    sections: state.content.sections
  }
}

export default connect( mapState )( Digest )
