import React from 'react'
import { connect } from 'react-redux'
import EditorSectionContainer from './editor-section-container'
import { loadStart, loadError, loadSuccess, addUpdate } from '../actions/update.js'
import { addSection } from '../actions/section.js'

export default class Editor extends React.Component {

  componentDidMount = () => {
    this.getLatestUpdate()
  }

  parseSections = (sections) => {
    sections.forEach( (section) => {
      this.props.dispatch({
        id: section.id,
        title: section.title,
        intro: section.intro,
        body: section.body,
        imageUrl: section.imageUrl
      })
    })
  }

  getLatestUpdate = () => {
    let ajax = new XMLHttpRequest()
    ajax.open('GET', '/api/updates/latest')

    ajax.onreadystatechange = () => {
      if ( ajax.readyState != XMLHttpRequest.DONE ) {
        return
      }

      if ( ajax.status !== 200 ) {
        this.props.dispatch(loadError())
      }

      let payload = JSON.parse(ajax.response).data
      
      this.props.dispatch(addUpdate({
        id: payload.id,
        draft: payload.draft,
        AccountId: payload.AccountId,
        sections: payload.Sections.map( (section) => { return section.id } )
      }))

      this.props.dispatch(loadSuccess())
    }

    ajax.send()
    this.props.dispatch(loadStart())
  }

  render() {
    // get update
    // if update is undefined
    //    create an update
    //    show add new section form
    // else
    //    render all the sections inside the form

    return (
      <div>
        <EditorSectionContainer/>
      </div>
    )
  }
}

function mapState(state){
  return {
    update: state.content.update
  }
}

export default connect( mapState )( Editor )
