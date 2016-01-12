import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

export default class Settings extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(this.sendFormData);
  }

  sendFormData = () => {
    // Prepare form data for submitting it.
    var formData = {
      firstName: ReactDOM.findDOMNode(this.refs.firstName).value,
      lastName: ReactDOM.findDOMNode(this.refs.lastName).value,
      email: ReactDOM.findDOMNode(this.refs.email).value,
      password: ReactDOM.findDOMNode(this.refs.password).value,
      currentUserId: this.props.currentUser.get('AccountId')
    };

    var xmlhttp = new XMLHttpRequest();
    var _this = this;
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        var response = JSON.parse(xmlhttp.responseText);
        if (xmlhttp.status === 200 && response.status === 'OK') {
          _this.forceUpdate();
        }
        else {
          _this.forceUpdate();
        }
      }
    };
    xmlhttp.open('PUT', 'api/accounts', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(this.requestBuildQueryString(formData));
  }

  requestBuildQueryString = (params) => {
    var queryString = [];
    for(var property in params)
      if (params.hasOwnProperty(property)) {
        queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
      }
    return queryString.join('&');
  }

  render() {
    return (
      <div className="mdl-grid">

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
              <label>Password</label>
              <input className="settings-profile-input" type="password" ref="password" name="password" defaultValue={`${this.props.currentUser.get('password')}`} />
            </div><br/>
            <div className="settings-profile-form-button-box">
              <button type="submit" className="mdl-button mdl-js-button mdl-button--raised settings-profile-form-button">Save</button>
            </div>
          </form>
        </div>

      </div>
    )
  }
}
function mapState (state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect( mapState )( Settings )
