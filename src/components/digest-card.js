import React from 'react'
import { Card, CardTitle } from 'react-mdl'

export default class DigestCard extends React.Component {
  readFull = () => {
    this.props.readFull(this.props.id)
  }

  render() {
    let publishedAt = new Date(this.props.publishedAt)
    let DateArray = publishedAt.toDateString().split(" ")
    let months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    let Month = months[publishedAt.getMonth()] || "Undefined"
    let Day = DateArray[2]  || "Undefined"
    let Year = DateArray[3]  || "Undefined"
    return (
      <Card className='mdl-card-dash mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-shadow--2dp'
            style={{ background: `url('${this.props.imageUrl}') center / cover no-repeat #657153`}}
            onClick={this.readFull}>
        <CardTitle>
          <div className='digest-card-box'>
            <div className='digest-card-date-box'>
              <p className='mdl-card__title-text digest-card-date-day'>{Day}</p>
              <p className='mdl-card__title-text digest-card-date-month'>{Month}</p>
              <p className='mdl-card__title-text digest-card-date-year'>{Year}</p>
            </div>
          </div>
        </CardTitle>
      </Card>
    )
  }
}
