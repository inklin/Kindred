import React from 'react'
import { Card, CardTitle, CardText } from 'react-mdl'

export default class Section extends React.Component {

  readFull = () => {
    this.props.readFullSection(this.props.id)
  }


  render() {
    return (
      <Card className="mdl-card-digest mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-shadow--2dp">
        <CardTitle 
          style={{ background: `url('${this.props.imageUrl}') center / cover no-repeat #46B6AC` }}>
          {this.props.title}
        </CardTitle>
        <CardText>
        {this.props.fullView ? this.props.body + this.props.body : this.props.body}
          <div className="mdl-typography--text-center">
            <a onClick={this.readFull}>{this.props.fullView ? "Less" : "Read More" }</a>
          </div>
        </CardText>
      </Card>
    )
  }
}
