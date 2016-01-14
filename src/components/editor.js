import React from 'react'
import { connect } from 'react-redux'
import { updateSection } from '../actions/section'
import EditorSection from './editor-section'
import EditorButtons from './editor-buttons'

export default class Editor extends React.Component {

  changeSection = (id, field, value) => {
    this.props.dispatch(updateSection(id, field, value))
  }

  render() {

    let editorSections = [];
    // find Update in draft mode and render all sections into editor sections
    let updates = this.props.updates;

    let update = updates.find(
      (update) => { return update.get('draft') }
    )

    // TODO: Bug >> Keeps creating new draft every time
    // if (update !== undefined) {
    //   console.log("Edit current draft")
      let sections = update.get('sections').map((sectionId) => {
        return this.props.sections.get(sectionId);
      })

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
              updateId={update.get('id')}
            />
          )
      })

    } else {
  //  TODO: PROBLEM: Keeps creating new draft no matter if there is already an update with draft column true in the db...
  //     console.log("create new draft")
  // Create new Update in draft mode with a section attached

      let ajax = new XMLHttpRequest()
      ajax.open('POST', '/api/updates/create-draft')
      ajax.onreadystatechange = () => {
        if ( ajax.readyState != XMLHttpRequest.DONE ) {
          return
        }
        if ( ajax.status !== 200 ) {
        }
        let payload = JSON.parse(ajax.response)
        // returns an update and a section in the response data
        console.log(payload);
        let newUpdate = payload.update
        let section = payload.section

        editorSections.push(
          <EditorSection
            id={section.id}
            key={section.id}
            imageUrl={section.imageUrl}
            title={section.title}
            intro={section.intro}
            body={section.body}
            changeSection={this.changeSection}
            updateId={newUpdate.id}
          />
        )
      }

      ajax.send()
    }

    // PROBLEM: Cannot get this to render AFTER ajax post request is done
    // Need to get the newly created update and section
    return (
      <div>
       {editorSections}
       <EditorButtons/>
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
