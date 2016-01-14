import React from 'react'

export default class Editor extends React.Component {

  saveUpdate = () => {

  }

  deleteUpdate = (id) => {
    let ajax = new XMLHttpRequest()
    ajax.open('DELETE', '/api/updates/' + id)
    ajax.onreadystatechange = () => {
      if ( ajax.readyState != XMLHttpRequest.DONE ) {
        return
      }
      if ( ajax.status !== 200 ) {
      }
      let payload = JSON.parse(ajax.response)
    }

    ajax.send()
  }

  publishUpdate = (id) => {
    let ajax = new XMLHttpRequest()
    ajax.open('POST', '/api/updates/publish')
    ajax.onreadystatechange = () => {
      if ( ajax.readyState != XMLHttpRequest.DONE ) {
        return
      }
      if ( ajax.status !== 200 ) {
      }
      let payload = JSON.parse(ajax.response)
    }

    ajax.send({
      updateId: id
    })
  }

  render() {
    return(
      <div>
        <div className="mdl-cell mdl-cell--12-col"></div>
        <div className="mdl-cell mdl-cell--3-col editor-update-buttons-spacer"></div>

        <div className="mdl-cell mdl-cell--5-col editor-update-buttons-box">
          <button className="mdl-button mdl-js-button mdl-button--raised editor-update-button" onClick={this.saveDraft}>Finish Later</button>
          <button className="mdl-button mdl-js-button mdl-button--raised editor-update-button" onClick={this.deleteUpdate}>Delete Update</button>
          <button className="mdl-button mdl-js-button mdl-button--raised editor-update-button">Preview</button>
          <button className="mdl-button mdl-js-button mdl-button--raised editor-update-button" onClick={this.publishUpdate}>Next</button>
        </div>
      </div>
    )
  }
}
