import React from 'react'
import Section from './digest/section'
import { connect } from 'react-redux'
import { loadStart, loadError, loadSuccess, addUpdate } from '../actions/update.js'

class Update extends React.Component {

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
      let payload = JSON.parse(ajax.response)
      this.props.dispatch(loadSuccess())
    }
    ajax.send()
    this.props.dispatch(loadStart())
  }

  render() {
    let currentUpdate = this.props.updates.get(parseInt(this.props.params.id))
    let sections = []
    
    currentUpdate.get('sections').forEach ((sectionId) => {
      let section = this.props.sections.get(sectionId)
      sections.push( 
        <Section 
          id={section.get('id')}
          key={section.get('id')}
          title={section.get('title')}
          body={section.get('body')}
          imageUrl={section.get('imageUrl')}
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