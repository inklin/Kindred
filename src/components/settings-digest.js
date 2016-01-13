import React from 'react'

export default class SettingsDigest extends React.Component {
  render() {
    return (
      <span>
        <div className="mdl-cell mdl-cell--12-col">
          <hr />
          <h4 className="settings-h4">Your Digest View Settings</h4>
        </div>

        {/* Digest Schedule Settings */}
        <div className="mdl-cell mdl-cell--3-col settings-digest-schedule">
          Receive Digests Every:
          <select defaultValue="1">
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
            <option value="7">Sunday</option>
          </select>
        </div>

        {/* Digest View Settings */}
        <div className="mdl-cell mdl-cell--5-col settings-digest-view">
          Receive Digest Emails As:
          <select defaultValue="intro">
            <option value="intro">Summary View</option>
            <option value="full">Full View</option>
          </select>
        </div>

      </span>
    )
  }
}
