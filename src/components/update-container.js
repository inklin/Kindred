import React from 'react'
import Update from './update'
import { connect } from 'react-redux'

class UpdateContainer extends React.Component {

  render() {
    let currentUpdate = this.props.updates.get(parseInt(this.props.params.id))
    if (currentUpdate === undefined ){
      return <h1>Loading</h1>
    }
    let sections = currentUpdate.get('sections')

    return (
      <span className="full-width">
        <Update sections={sections} />
      </span>
    )
  }
}

function mapState(state){
  return {
    updates: state.content.updates
  }
}

export default connect( mapState )( UpdateContainer )
