import React from 'react'
import Digest from './digest'
import { connect } from 'react-redux'

class DigestContainer extends React.Component {

  render() {
    let currentDigest = this.props.digests.get(parseInt(this.props.params.id))
    if ( currentDigest === undefined ){
      return <h1>Loading</h1>
    }
    let currentSections = []

    currentDigest.get('updates').forEach ((updateID) => {
      this.props.updates.get(updateID).get('sections').forEach ((sectionId) => {
        currentSections.push(sectionId)
      })
    })

    return (
      <span className="full-width">
        <Digest
          id={currentDigest.get('id')}
          sections={currentSections}
        />
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

export default connect( mapState )( DigestContainer )
