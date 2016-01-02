import React from 'react'
import Section from './digest/section'
import { connect } from 'react-redux'

class Update extends React.Component {

  render() {
    let currentUpdate = this.props.updates.get(this.props.params.id)
    let sections = []
    
    currentUpdate.sections.forEach ((sectionId) => {
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

    return (
      <div className="mdl-grid">
        {sections}
      </div>
    )
  }
}

function mapState(state){
  return {
    updates: state.content.updates,
    sections: state.content.sections
  }
}

export default connect( mapState )( Update )