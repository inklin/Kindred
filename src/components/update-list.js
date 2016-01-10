import React from 'react'
import DigestCard from './digest-card'

import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { saveImageUrl, loadStart, loadError, loadSuccess, addUpdate } from '../actions/my-update.js'
import { addSection } from '../actions/section.js'

class UpdateList extends React.Component {

  componentDidMount = () => {
    if ( this.props.updates.size === 0 ){
      this.fetchAllUpdates()
    } else {
      this.props.updates.forEach( (update) =>{
        this.getImageUrl(update.get('id'))
      })
    }
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

  fetchAllUpdates = () => {
    let ajax = new XMLHttpRequest()
    ajax.open('GET', '/api/updates')
    ajax.onreadystatechange = () => {
      if ( ajax.readyState != XMLHttpRequest.DONE ) {
        return
      }
      if ( ajax.status !== 200 ) {
        this.props.dispatch(loadError())
      }
      let payload = JSON.parse(ajax.response)
      
      this.parseUpdates(payload.updates)
      this.props.dispatch(loadSuccess())
    }
    ajax.send()
    this.props.dispatch(loadStart())
  }


  readFullUpdate = (id) => {
    this.props.dispatch(pushPath(`/updates/${id}`))
  }

  getImageUrl = (id) => {
    function getRandomArrayElement(arr){
      return arr[Math.floor(Math.random() * arr.length)]
    }

    let imageUrl
    let update = this.props.updates.get(id)
    // gets random image URL to display in update page, clean up this messyness
    if ( update.get('imageUrl') === undefined ){
      let randSection = this.props.sections.get(getRandomArrayElement(update.get('sections')))
      imageUrl = randSection.get('imageUrl')

      this.props.dispatch( saveImageUrl(update.get('id'), imageUrl))
    } else { 
      imageUrl = update.get('imageUrl')
    }
    return imageUrl
  }

  render() {
    let updates = []
    this.props.updates.forEach ( (update) => {
      updates.push(
        <DigestCard
          id={update.get('id')}
          key={update.get('id')}
          publishedAt={update.get('publishedAt')}
          imageUrl={update.get('imageUrl')}
          readFull={this.readFullUpdate}
        />
      )
    })

    return (
      <div className="mdl-grid">
        { updates }
      </div>
    )
  }
}

function mapState(state){
  return {
    updates: state.content.myUpdates,
    sections: state.content.sections
  }
}

export default connect ( mapState )( UpdateList )
