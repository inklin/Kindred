import React from 'react'
import { Card, CardTitle, CardText } from 'react-mdl'

export default class FullSection extends React.Component {

  render() {
    return (
      <Card className="mdl-card-digest mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet">
        <CardTitle 
          style={{ background: `url('${this.props.imageUrl}') center / cover no-repeat #46B6AC` }}>
          {this.props.title}
        </CardTitle>
        <CardText>
          {this.props.body}
        </CardText>
      </Card>
    )
  }
}
