import React from 'react'
import DigestCard from './digest-card'

export default class Update extends React.Component {
  render() {
    return (
      <div className="mdl-grid">
       <DigestCard publishedAt='29 December 2015'/>
       <DigestCard publishedAt='19 January 2016'/>
      </div>
    )
  }
}