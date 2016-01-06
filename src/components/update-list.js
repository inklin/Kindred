import React from 'react'
import DigestCard from './digest-card'

import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { saveImageUrl } from '../actions/update.js'

class UpdateList extends React.Component {
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
    if ( update.imageUrl === undefined ){
      let randSection = this.props.sections.get(getRandomArrayElement(update.sections))
      imageUrl = randSection.imageUrl

      this.props.dispatch( saveImageUrl(update.id, imageUrl) )
    } else { 
      imageUrl = update.imageUrl
    }
    return imageUrl
  }

  render() {
    let updates = []
    
    this.props.updates.forEach ( (update) => {

      updates.push(
        <DigestCard
          id={update.id}
          key={update.id}
          publishedAt={update.publishedAt}
          imageUrl={this.getImageUrl(update.id)}
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
    updates: state.content.updates,
    sections: state.content.sections
  }
}

export default connect ( mapState )( UpdateList )
