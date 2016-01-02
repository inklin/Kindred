import React from 'react'
import DigestCard from './digest-card'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class DigestList extends React.Component {
  readFullDigest = (id) => {
    this.props.dispatch(pushPath(`/digests/${id}`))
  }

  render() {
    function getRandomArrayElement(arr){
      return arr[Math.floor(Math.random() * arr.length)]
    }

    let digests = []

    this.props.digests.forEach ( (digest) => {

      // gets random image URL to display in digest page, clean up this messyness
      let randUpdate = this.props.updates.get(getRandomArrayElement(digest.updates))
      let randSection = this.props.sections.get(getRandomArrayElement(randUpdate.sections))

      digests.push(<DigestCard 
        id={digest.id}
        key={digest.id}
        imageUrl={randSection.imageUrl}
        publishedAt={digest.sentAt}
        readFull={this.readFullDigest}
        />)
    })
    return (
     <div className='mdl-grid'>
      {digests}
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
export default connect( mapState )( DigestList )
