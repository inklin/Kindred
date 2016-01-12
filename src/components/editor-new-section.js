import React from 'react'
import ReactDOM from 'react-dom'

export default class EditorNewSection extends React.Component {

  sendSectionData = () => {

    var title = ReactDOM.findDOMNode(this.refs.title).value;
    var intro = ReactDOM.findDOMNode(this.refs.intro).value;
    var body = ReactDOM.findDOMNode(this.refs.body).value;
    var file = ReactDOM.findDOMNode(this.refs.file).value;

    var section = {
      title: title,
      intro: intro,
      body: body,
      file: file
    };

    let ajax = new XMLHttpRequest()
    ajax.open('POST', '/api/sections')

  }

  render() {

    var avatarStyle = { background: `url(http://www.wallpapereast.com/static/images/abstract_wallpaper_1080p_by_supersaejang-d7ajj1p.png) center / cover no-repeat #eeeeee` };

    return (
      <div>
        <div className="mdl-cell mdl-cell--3-col editor-section-img-box">
          <div className="editor-image-overlay">
            <div className="editor-image" style={ avatarStyle }>
            </div>
          </div>
          <div className="editor-section-image-button-box">
            <input type="file" name="file" ref="file" className="mdl-button mdl-js-button mdl-button--raised editor-image-button" style={{ width: 300 }} defaultValue="Choose an image" />
          </div>
        </div>

        <div className="mdl-cell mdl-cell--5-col editor-section-form">
          <div>
            <input className="editor-section-title" type="text" ref="title" id="title" name="title" placeholder="Enter a title."/>
          </div><br/>
          <div>
            <textarea className="editor-section-intro" type="text" ref="intro" rows="3" id="intro" name="intro" placeholder="Enter a short summary."></textarea>
          </div><br/>
          <div>
            <textarea className="editor-section-body" type="text" ref="body" rows="10" id="body" name="body" placeholder="Have more to say about it?"></textarea>
          </div>
          <div className="editor-form-button-box">
            <button className="mdl-button mdl-js-button mdl-button--raised editor-form-button" onClick={this.sendSectionData}>Save Section</button>
            <button className="mdl-button mdl-js-button mdl-button--raised editor-form-button">Add New Section</button>
          </div>
        </div>
      </div>
    )
  }
}
