import React from 'react'
import { connect } from 'react-redux'
import { updateSection } from '../actions/section'
import EditorSection from './editor-section'

export default class Editor extends React.Component {

  changeSection = (id, field, value) => {
    this.props.dispatch(updateSection(id, field, value))
  }

  render() {
    let updates = this.props.updates;

    let update = updates.find(
      (update) => { return update.get('draft') }
    )

    let sections = update.get('sections').map((sectionId) => {
      return this.props.sections.get(sectionId);
    })

    let editorSections = [];

    sections.forEach((section) => {
        let sect = section.toJS();

        editorSections.push(
          <EditorSection
            id={sect.id}
            key={sect.id}
            imageUrl={sect.imageUrl}
            title={sect.title}
            intro={sect.intro}
            body={sect.body}
            changeSection={this.changeSection}
          />
        )
    })

    return (
      <div>
        {editorSections}
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

export default connect( mapState )( Editor )
