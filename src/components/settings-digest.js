import React from 'react'
import { connect } from 'react-redux'
import { loadError, loadSuccess, setDigestSettings } from '../actions/account'

class SettingsDigest extends React.Component {
  handleChange = () => {
    this.sendFormData();
  }

  sendFormData = () => {
    var formData = {
      digestSchedule: this.refs.schedule.value,
      digestView: this.refs.view.value,
      firstName: this.props.currentUser.get('firstName'),
      lastName: this.props.currentUser.get('lastName'),
      email: this.props.currentUser.get('email'),
      username: this.props.currentUser.get('userName'),
      avatarUrl: this.props.currentUser.get('avatarUrl')
    };

    this.props.dispatch(setDigestSettings(formData));

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
          this.props.dispatch(loadSuccess(response.data))
        }
        else {
          this.props.dispatch(loadError())
        }
      }
    };

    xmlhttp.open('PUT', 'api/people', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(requestBuildQueryString(formData));
  }

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
          <select ref="schedule" onChange={this.handleChange} defaultValue={`${this.props.currentUser.get('digestSchedule')}`}>
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
          <select ref="view" onChange={this.handleChange} defaultValue={`${this.props.currentUser.get('digestView')}`}>
            <option value="snippet">Summary View</option>
            <option value="full">Full View</option>
          </select>
        </div>

      </span>
    )
  }
}

function mapState (state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect( mapState )( SettingsDigest )
