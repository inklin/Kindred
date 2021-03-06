import React from 'react'
import SectionContainer from './section-container'

class Update extends React.Component {

  render() {
    let sections = []

    this.props.sections.forEach( (sectionId) =>{
      sections.push(
      <SectionContainer
        id={sectionId}
        key={sectionId}
      />)
    })

    return (
      <span>
        {sections}
      </span>
    )
  }
}

export default Update
