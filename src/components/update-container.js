import React from 'react'
import Update from './update'
import { connect } from 'react-redux'
import { loadStart, loadError, loadSuccess, addUpdate } from '../actions/update.js'
import { addSection } from '../actions/section.js'

class UpdateContainer extends React.Component {

  componentDidMount = () => {
    if (this.props.updates.get(parseInt(this.props.params.id))){
      return
    }
    this.fetchUpdate()
  }

  parseSections = (sections) => {
    sections.forEach( (section) => {
      let comments = section.Comments.map( (comment) => {
        return comment.id
      })

      this.props.dispatch(addSection({
        id: section.id,
        title: section.title,
        intro: section.intro,
        body: section.body,
        imageUrl: section.imageUrl,
        comments: comments,
        AccountId: section.AccountId
      }))
    })
  }

  fetchUpdate = () => {
    let ajax = new XMLHttpRequest()
    ajax.open('GET', `/api/updates/${this.props.params.id}`)
    ajax.onreadystatechange = () => {
      if ( ajax.readyState != XMLHttpRequest.DONE ) {
        return
      }
      if ( ajax.status !== 200 ) {
        this.props.dispatch(loadError())
      }
      let payload = JSON.parse(ajax.response).data

      this.parseSections(payload.Sections)

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
    let currentUpdate = this.props.updates.get(parseInt(this.props.params.id))
    if (currentUpdate === undefined ){
      return <h1>Loading</h1>
    }
    let sections = currentUpdate.get('sections')
  
    return (
      <div className="mdl-grid">
        <Update sections={sections} />
      </div>
    )
  }
}

function mapState(state){
  return {
    updates: state.content.updates
  }
}

export default connect( mapState )( UpdateContainer )