import React from 'react'
import Section from './section'
import { connect } from 'react-redux'
import { readFull } from '../actions/section.js'


class SectionContainer extends React.Component {
  
  readFullSection = (id) => {
    this.props.dispatch(readFull(id))
  }

  render() {
    let id = parseInt(this.props.id)
    let currentSection = this.props.sections.get(id)

    return (
      <Section 
        id={currentSection.get('id')}
        imageUrl={currentSection.get('imageUrl')}
        title={currentSection.get('title')}
        intro={currentSection.get('intro')}
        body={currentSection.get('body')}
        fullView={currentSection.get('fullView')}
        readFullSection={this.readFullSection}
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
