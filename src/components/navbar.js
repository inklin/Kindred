import React from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <h1>Nav</h1>
        <ul>
          <li><h3 onClick={() => this.props.dispatch(pushPath('/'))}>Home</h3></li>
          <li><h3 onClick={() => this.props.dispatch(pushPath('/editor'))}>Editor</h3></li>
          <li><h3 onClick={() => this.props.dispatch(pushPath('/digests/1'))}>Digest</h3></li>
          <li><h3 onClick={() => this.props.dispatch(pushPath('/sections/1'))}>Section</h3></li>
          <li><h3 onClick={() => this.props.dispatch(pushPath('/updates'))}>Update</h3></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default connect()( Navbar )