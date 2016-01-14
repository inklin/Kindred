import React from 'react'
import DigestCard from './digest-card'

import { saveImageUrl } from '../actions/digest'

import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class DigestList extends React.Component {

  componentDidMount = () => {
    if ( this.props.digests.size !== 0 ){
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
