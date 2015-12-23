import React from 'react'
import DigestCard from './digest-card'
export default class DigestList extends React.Component {

  render() {
    return (
      <div className="mdl-grid">
       <DigestCard publishedAt='19 December 2015'/>
       <DigestCard publishedAt='25 December 2015'/>
       <DigestCard publishedAt='02 January 2016'/>
       <DigestCard publishedAt='19 January 2016'/>
      </div>
  )
  }
}