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
      <div className="mdl-grid">
        <Update sections={sections} />
      </div>
    )
  }
}

function mapState(state){
  return {
    updates: state.content.updates
  }
}

export default connect( mapState )( UpdateContainer )