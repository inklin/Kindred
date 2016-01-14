import React from 'react'

export default class Editor extends React.Component {

  saveUpdate = () => {
    // ****TODO**** need to save all the sections ? (intro, UpdateId, body etc)
    // Nothing needs to be changed about the Update itself
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
    // *****TODO**** redirect to main page after update deletion?
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

    // *****TODO***** Also need to create Digest-Updates (there is a route but I don't know how to do both publish and create digest-updates)
    // POST /api/digestupdates
    // takes an update object in the request (request.update)
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
