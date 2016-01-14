import React from 'react'
import DigestCard from './digest-card'

import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { saveImageUrl } from '../actions/my-update.js'

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
      <span className="full-width">
        { updates }
      </span>
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
