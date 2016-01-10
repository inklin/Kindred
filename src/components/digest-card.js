import React from 'react'
import { Card, CardTitle } from 'react-mdl'

export default class DigestCard extends React.Component {
  readFull = () => {
    this.props.readFull(this.props.id)
  }

  render() {
    let publishedAt = new Date(this.props.publishedAt)
    let DateString = publishedAt.toDateString()
    return (
      <Card className='mdl-card-dash mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-shadow--2dp'
            style={{ background: `url('${this.props.imageUrl}') center / cover no-repeat #46B6AC`}}
            onClick={this.readFull}>
        <CardTitle>
          <h2 className='mdl-card__title-text'>{DateString}</h2>
        </CardTitle>
      </Card>
    )
  }
}
