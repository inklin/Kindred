import React from 'react'
import DigestCard from './digest-card'

import { saveImageUrl } from '../actions/digest'

import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

import { loadStart, loadError, loadSuccess, addDigest } from '../actions/digest.js'
import { addSection } from '../actions/section.js'
import { addUpdate } from '../actions/update.js'


class DigestList extends React.Component {

  componentDidMount = () => {
    if ( this.props.digests.size === 0 ){
      this.fetchAllDigests()
    } else {
      this.props.digests.forEach( (digest) =>{
        this.getImageUrl(digest.get('id'))
      })
    }
  }

  readFullDigest = (id) => {
    this.props.dispatch(pushPath(`/digests/${id}`))
  }

  getImageUrl = (id) => {
    function getRandomArrayElement(arr){
      return arr[Math.floor(Math.random() * arr.length)]
    }

    let imageUrl

    let digest = this.props.digests.get(id)

    // gets random image URL to display in update page, clean up this messyness
    if ( digest.get('imageUrl') === undefined ){
      let randUpdate = this.props.updates.get(getRandomArrayElement(digest.get('updates')))
      let randSection = this.props.sections.get(getRandomArrayElement(randUpdate.get('sections')))
      imageUrl = randSection.get('imageUrl')

      this.props.dispatch( saveImageUrl(digest.get('id'), imageUrl))
    } else {
      imageUrl = digest.get('imageUrl')
    }
    return imageUrl
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

  fetchAllDigests = () => {
    let ajax = new XMLHttpRequest()
    ajax.open('GET', '/api/digests')
    ajax.onreadystatechange = () => {
      if ( ajax.readyState != XMLHttpRequest.DONE ) {
        return
      }
      if ( ajax.status !== 200 ) {
        this.props.dispatch(loadError())
      }
      let payload = JSON.parse(ajax.response).data

      this.parseDigests(payload)
      this.props.dispatch(loadSuccess())
    }
    ajax.send()
    this.props.dispatch(loadStart())
  }

  render() {
    let digests = []

    this.props.digests.forEach ( (digest) => {

      digests.push(<DigestCard
        id={digest.get('id')}
        key={digest.get('id')}
        imageUrl={digest.get('imageUrl')}
        publishedAt={digest.get('sentAt')}
        readFull={this.readFullDigest}
      />)
    })
    return (
     <span className="full-width">
      {digests}
     </span>
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
export default connect( mapState )( DigestList )
