import React from 'react'
import DigestCard from './digest-card'

import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class UpdateList extends React.Component {
  readFullUpdate = (id) => {
    this.props.dispatch(pushPath(`/updates/${id}`))
  }

  render() {
    let updates = []

    function getRandomArrayElement(arr){
      return arr[Math.floor(Math.random() * arr.length)]
    }

    this.props.updates.forEach ( (update) => {
      let randSection = this.props.sections.get(getRandomArrayElement(update.sections))

      updates.push(
        <DigestCard
          id={update.id}
          key={update.id}
          publishedAt={update.publishedAt}
          imageUrl={randSection.imageUrl}
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
