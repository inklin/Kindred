import React from 'react'
import { connect } from 'react-redux'
import { loadError, loadSuccess, setPersonalInfo } from '../actions/account'

class SettingsPersonalInfo extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.sendFormData();
  }

  sendFormData = () => {
    var formData = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value,
      username: this.refs.username.value,
      password: this.refs.password.value,
      avatarUrl: `${this.props.currentUser.get('avatarUrl')}`
    };

    this.props.dispatch(setPersonalInfo(formData));

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

    xmlhttp.open('PUT', 'api/accounts', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(requestBuildQueryString(formData));
  }

  render() {
    return (
      <span>

        <div className="mdl-cell mdl-cell--12-col">
          <h3>Settings</h3>
        </div>

        {/* Personal Info Settings */}
        <div className="mdl-cell mdl-cell--12-col">
          <h4 className="settings-h4">Your Personal Info</h4>
        </div>

        {/* Personal Info Avatar */}
        <div className="mdl-cell mdl-cell--3-col settings-profile-img-box">
          <div className="editor-image"
            style={{ background: `url('${this.props.currentUser.get('avatarUrl')}') center / cover no-repeat #eeeeee`}}>
          </div>
          <div className="settings-profile-image-button-box">
            <button className="mdl-button mdl-js-button mdl-button--raised settings-profile-image-button">Update Your Avatar</button>
          </div>
        </div>

        {/* Personal Info Text Fields */}
        <div className="mdl-cell mdl-cell--5-col settings-profile-form">
          <form action="" onSubmit={this.handleSubmit}>
            <div>
              <label>First Name</label>
              <input className="settings-profile-input" type="text" ref="firstName" name="firstName" defaultValue={`${this.props.currentUser.get('firstName')}`} />
            </div><br/>
            <div>
              <label>Last Name</label>
              <input className="settings-profile-input" type="text" ref="lastName" name="lastName" defaultValue={`${this.props.currentUser.get('lastName')}`} />
            </div><br/>
            <div>
              <label>Email Address</label>
              <input className="settings-profile-input" type="text" ref="email" name="email" defaultValue={`${this.props.currentUser.get('email')}`} />
            </div><br/>
            <div>
              <label>Username</label>
              <input className="settings-profile-input" type="text" ref="username" name="username" defaultValue={`${this.props.currentUser.get('userName')}`} />
            </div><br/>
            <div>
              <label>Password</label>
              <input className="settings-profile-input" type="password" ref="password" name="password" defaultValue={`${this.props.currentUser.get('password')}`} />
            </div><br/>
            <div className="settings-profile-form-button-box">
              <button type="submit" className="mdl-button mdl-js-button mdl-button--raised settings-profile-form-button">Save</button>
            </div>
          </form>
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

export default connect( mapState )( SettingsPersonalInfo )
