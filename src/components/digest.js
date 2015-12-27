import React from 'react'
import Section from './digest/section'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

class Digest extends React.Component {
  readFullSection = (id) => {
    this.props.dispatch(pushPath(`/sections/${id}`))
  }

  render() {
    return (
      <div className="mdl-grid">
        <Section
          id='1'
          imageUrl='https://upload.wikimedia.org/wikipedia/commons/2/2b/Vancouver_-_Gastown_01.jpg'
          title='Section Title'
          body='Curabitur posuere lacinia tortor non facilisis. Praesent varius, mi ut suscipit molestie, tellus risus cursus libero, in tincidunt nisl dolor ac mauris. Praesent molestie convallis tortor, mollis tristique arcu fermentum interdum. Phasellus eleifend fringilla ullamcorper. Donec tristique, dui at blandit pretium, ex sem egestas dolor, vel fermentum magna dui at ligula. Nam erat neque, maximus et nibh eu, vehicula vestibulum lectus. Aenean non nunc sed enim pellentesque interdum. In venenatis elit nulla. Donec vulputate purus vel tortor feugiat, eu finibus odio tempus. Aliquam feugiat lacus at dolor aliquet congue.'
          readFull={this.readFullSection}
        />
        <Section
          id='2' 
          imageUrl='http://i.imgur.com/TAf5zra.jpg'
          title='Section Title'
          body='Curabitur posuere lacinia tortor non facilisis. Praesent varius, mi ut suscipit molestie, tellus risus cursus libero, in tincidunt nisl dolor ac mauris. Praesent molestie convallis tortor, mollis tristique arcu fermentum interdum. Phasellus eleifend fringilla ullamcorper. Donec tristique, dui at blandit pretium, ex sem egestas dolor, vel fermentum magna dui at ligula. Nam erat neque, maximus et nibh eu, vehicula vestibulum lectus. Aenean non nunc sed enim pellentesque interdum. In venenatis elit nulla. Donec vulputate purus vel tortor feugiat, eu finibus odio tempus. Aliquam feugiat lacus at dolor aliquet congue.'
          readFull={this.readFullSection}
        />
        <Section
          id='3'
          imageUrl='http://i.imgur.com/UMSYaaI.jpg'
          title='Section Title'
          body='Curabitur posuere lacinia tortor non facilisis. Praesent varius, mi ut suscipit molestie, tellus risus cursus libero, in tincidunt nisl dolor ac mauris. Praesent molestie convallis tortor, mollis tristique arcu fermentum interdum. Phasellus eleifend fringilla ullamcorper. Donec tristique, dui at blandit pretium, ex sem egestas dolor, vel fermentum magna dui at ligula. Nam erat neque, maximus et nibh eu, vehicula vestibulum lectus. Aenean non nunc sed enim pellentesque interdum. In venenatis elit nulla. Donec vulputate purus vel tortor feugiat, eu finibus odio tempus. Aliquam feugiat lacus at dolor aliquet congue.'
          readFull={this.readFullSection}
        />

      </div>
    )
  }
}

export default connect()( Digest )