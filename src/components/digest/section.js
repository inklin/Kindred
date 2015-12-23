import React from 'react'
import { Card, CardTitle, CardText } from 'react-mdl'

export default class Section extends React.Component {
  render() {
    return (
      <Card className="mdl-card-digest mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-shadow--2dp">
        <CardTitle 
          style={{ background: "url('https://upload.wikimedia.org/wikipedia/commons/2/2b/Vancouver_-_Gastown_01.jpg') center / cover no-repeat #46B6AC" }}>
          Section Title
        </CardTitle>
        <CardText>Curabitur posuere lacinia tortor non facilisis. Praesent varius, mi ut suscipit molestie, tellus risus cursus libero, in tincidunt nisl dolor ac mauris.
          Praesent molestie convallis tortor, mollis tristique arcu fermentum interdum. Phasellus eleifend fringilla ullamcorper. Donec tristique, dui at blandit pretium, ex sem egestas dolor, vel fermentum magna dui at ligula.
          Nam erat neque, maximus et nibh eu, vehicula vestibulum lectus. Aenean non nunc sed enim pellentesque interdum. In venenatis elit nulla. 
          Donec vulputate purus vel tortor feugiat, eu finibus odio tempus. Aliquam feugiat lacus at dolor aliquet congue.
          <div className="mdl-typography--text-center">
            <a href="#">Read More</a>
          </div>
        </CardText>
      </Card>
    )
  }
}
