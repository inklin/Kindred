import React from 'react'
import Section from './digest/section'
import { connect } from 'react-redux'

class Digest extends React.Component {

  render() {
    let currentDigest = this.props.digests.get(this.props.params.id)
    let sections = []
    
    currentDigest.updates.forEach ((updateID) => {
      this.props.updates.get(updateID).sections.forEach ((sectionId) => {
        let section = this.props.sections.get(sectionId)
        sections.push( 
          <Section 
            id={section.id}
            key={section.id}
            title={section.title}
            body={section.body}
            imageUrl={section.imageUrl}
          />)
      })
    })

    return (
      <div className="mdl-grid">
        {sections}
      </div>
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
