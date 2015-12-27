import React from 'react'
import DigestCard from './digest-card'

export default class DigestList extends React.Component {

  render() {
    return (
    <div className="mdl-grid">
      <DigestCard 
        publishedAt='19 December 2015'
        imageUrl='http://tfirdaus.github.io/mdl/images/laptop.jpg'
      />

      <DigestCard 
        publishedAt='25 December 2015'
        imageUrl='http://i.imgur.com/gO3vYga.jpg'
      />

      <DigestCard 
        publishedAt='01 January 2016'
        imageUrl='http://i.imgur.com/NPsCCKZ.jpg'
      />

      <DigestCard 
        publishedAt='01 January 2016'
        imageUrl='http://i.imgur.com/UMSYaaI.jpg'
      />
    </div>
    )
  }
}