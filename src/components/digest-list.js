import React from 'react'
import DigestCard from './digest-card'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class DigestList extends React.Component {
  readFullDigest = (id) => {
    this.props.dispatch(pushPath(`/digests/${id}`))
  }

  render() {
    return (
    <div className="mdl-grid">
      <DigestCard 
        id='1'
        publishedAt='19 December 2015'
        imageUrl='http://tfirdaus.github.io/mdl/images/laptop.jpg'
        readFull={this.readFullDigest}
      />

      <DigestCard
        id='2'
        publishedAt='25 December 2015'
        imageUrl='http://i.imgur.com/gO3vYga.jpg'
        readFull={this.readFullDigest}
      />

      <DigestCard
        id='3'
        publishedAt='01 January 2016'
        imageUrl='http://i.imgur.com/NPsCCKZ.jpg'
        readFull={this.readFullDigest}
      />
    </div>
    )
  }
}

export default connect()( DigestList )