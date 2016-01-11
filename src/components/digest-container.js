import React from 'react'
import Digest from './digest'
import { connect } from 'react-redux'

import { loadStart, loadError, loadSuccess, addDigest } from '../actions/digest.js'
import { addSection } from '../actions/section.js'
import { addUpdate } from '../actions/update.js'

class DigestContainer extends React.Component {

  componentDidMount = () => {
    if (this.props.digests.get(parseInt(this.props.params.id))){
      return
    }
    this.fetchDigest()
  }

  parseSections = (sections) => {
    sections.forEach( (section) => {

      this.props.dispatch(addSection({
        id: section.id,
        title: section.title,
        intro: section.intro,
        body: section.body,
        imageUrl: section.imageUrl,
        AccountId: section.AccountId
      }))
    })
  }

  parseUpdates = (updates) => {
    updates.forEach( (update) => {
      this.parseSections(update.Sections)
      let sections = update.Sections.map( (section) => {
        return section.id
      })
      this.props.dispatch(addUpdate({
        id: update.id,
        draft: update.draft,
        sections: sections,
        AccountId: update.AccountId
      }))
    })
  }

  parseDigests = (digests) => {
    digests.forEach( (digest) => {
      this.parseUpdates(digest.Updates)
      let updates = digest.Updates.map( (update) => {
        return update.id
      })
      this.props.dispatch(addDigest({
        id: digest.id,
        readAt: digest.readAt,
        sentAt: digest.sentAt,
        updates: updates,
        PersonId: digest.PersonId
      }))
    })
  }

  fetchDigest = () => {
    let ajax = new XMLHttpRequest()
    ajax.open('GET', '/api/digests/' + this.props.params.id)
    ajax.onreadystatechange = () => {
      if ( ajax.readyState != XMLHttpRequest.DONE ) {
        return
      }
      if ( ajax.status !== 200 ) {
        this.props.dispatch(loadError())
      }
      let payload = JSON.parse(ajax.response).data
      
      this.parseDigests([payload])
      this.props.dispatch(loadSuccess())
    }
    ajax.send()
    this.props.dispatch(loadStart())
  }

  render() {
    let currentDigest = this.props.digests.get(parseInt(this.props.params.id))
    if ( currentDigest === undefined ){
      return <h1>Loading</h1>
    }
    let currentSections = []

    currentDigest.get('updates').forEach ((updateID) => {
      this.props.updates.get(updateID).get('sections').forEach ((sectionId) => {
        currentSections.push(sectionId)
      })
    })

    return (
      <div className="mdl-grid">
        <Digest
          id={currentDigest.get('id')}
          sections={currentSections}
        />
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

export default connect( mapState )( DigestContainer )
