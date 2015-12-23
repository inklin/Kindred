import React from 'react'

export default class Section extends React.Component {
  render() {
    return (
      <div class="mdl-card-digest mdl-card mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-shadow--2dp">
        <div class="mdl-card__title">
          <h1 class="mdl-card__title-text">Post Title</h1>
        </div>
        <div class="mdl-card__supporting-text">
          <p><strong>Need to pull in Author name, Author Avatar, and Date</strong></p>
          <p>Curabitur posuere lacinia tortor non facilisis. Praesent varius, mi ut suscipit molestie, tellus risus cursus libero, in tincidunt nisl dolor ac mauris. Praesent molestie convallis tortor, mollis tristique arcu fermentum interdum. Phasellus eleifend fringilla ullamcorper. Donec tristique, dui at blandit pretium, ex sem egestas dolor, vel fermentum magna dui at ligula. Nam erat neque, maximus et nibh eu, vehicula vestibulum lectus. Aenean non nunc sed enim pellentesque interdum. In venenatis elit nulla. Donec vulputate purus vel tortor feugiat, eu finibus odio tempus. Aliquam feugiat lacus at dolor aliquet congue.</p>
          <div class="mdl-typography--text-center">
            <a href="#">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}