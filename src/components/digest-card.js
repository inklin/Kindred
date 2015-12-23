import React from 'react'
import { Card, CardTitle } from 'react-mdl'

export default class DigestCard extends React.Component {
  render() {
    return (
      <Card className='mdl-card-dash mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-shadow--2dp'
            style={{ background: "url('http://tfirdaus.github.io/mdl/images/laptop.jpg') center / cover no-repeat #46B6AC"}}>
        <CardTitle>
          <h2 className='mdl-card__title-text'>{this.props.publishedAt}</h2>
        </CardTitle>
      </Card>
    )
  }
}