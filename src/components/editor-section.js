import React from 'react'

export default class EditorSection extends React.Component {

  titleOnChange = (e) => {
    this.props.changeSection(this.props.id, 'title', e.target.value)
  }

  introOnChange = (e) => {
    this.props.changeSection(this.props.id, 'intro', e.target.value)
  }

  bodyOnChange = (e) => {
    this.props.changeSection(this.props.id, 'body', e.target.value)
  }

  handleImageUrl = (e) => {
    this.props.changeSection(this.props.id, 'imageUrl', e.target.value)
  }

  saveSection = () => {
    var formData = {
      id: this.props.id,
      title: this.props.title,
      intro: this.props.intro,
      body: this.props.body,
      imageUrl: this.props.imageUrl
    }

    var requestBuildQueryString = (params) => {
      var queryString = [];
      for(var property in params)
        if (params.hasOwnProperty(property)) {
          queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
        }
      return queryString.join('&');
    }

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        var response = JSON.parse(xmlhttp.responseText);
        if (xmlhttp.status === 200 && response.status === 'OK') {
        }
        else {
        }
      }
    };

    xmlhttp.open('PUT', 'api/sections/' + this.props.id, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(requestBuildQueryString(formData));
  }

  render() {
    return (
      <div>
        <div className="mdl-cell mdl-cell--3-col editor-section-img-box">
          <div className="editor-image-overlay">
            <div className="editor-image" style={{ background: `url('${this.props.imageUrl}') center / cover no-repeat #eeeeee`}}>
            </div>
          </div>
          <div className="editor-section-image-button-box">
            <input type="text" className="editor-section-title" placeholder="Enter image url" onChange={this.handleImageUrl} value={this.props.imageUrl}></input>
          </div>
        </div>

        <div className="mdl-cell mdl-cell--5-col editor-section-form">
          <div>
            <input className="editor-section-title" type="text" id="title" name="title" placeholder="Enter your title" value={this.props.title} onChange={this.titleOnChange}></input>
          </div><br/>
          <div>
            <textarea className="editor-section-intro" type="text" rows="3" id="intro" name="intro" placeholder="Enter a short summary." value={this.props.intro} onChange={this.introOnChange}></textarea>
          </div><br/>
          <div>
            <textarea className="editor-section-body" type="text" rows="10" id="body" name="body" placeholder="Have more to say about it?" value={this.props.body} onChange={this.bodyOnChange}></textarea>
          </div>
          <div className="editor-form-button-box">
            <button className="mdl-button mdl-js-button mdl-button--raised editor-form-button" onClick={this.saveSection}>Save Section</button>
            <button className="mdl-button mdl-js-button mdl-button--raised editor-form-button">Add New Section</button>
          </div>
        </div>
      </div>
    )
  }
}
