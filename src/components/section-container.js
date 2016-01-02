import React from 'react'
import FullSection from './full-section'
import { connect } from 'react-redux'

class SectionContainer extends React.Component {
  render() {
    let currentSection = this.props.sections.get(this.props.params.id)

    return (
      <FullSection 
        imageUrl={currentSection.imageUrl}
        title={currentSection.title}
        body={currentSection.body}
      />
    )
  }
}

function mapState (state) {
  return {
    sections: state.content.sections
  }
}

export default connect ( mapState ) ( SectionContainer )
