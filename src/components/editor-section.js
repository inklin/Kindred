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

  saveSection = () => {
    var section = {
      id: this.props.id,
      title: this.props.title,
      intro: this.props.intro,
      body: this.props.body
    }

    console.log('Section: ', section);
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
            <button className="mdl-button mdl-js-button mdl-button--raised editor-image-button" style={{ width: `300` }}>Choose An Image</button>
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
