import React from 'react'
import { connect } from 'react-redux'
import { loadError, loadSuccess, addNewContact } from '../actions/account'

class SettingsContacts extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.sendFormData();
  }

  sendFormData = () => {
    var formData = {
      digestSchedule: this.props.currentUser.get('digestSchedule'),
      digestView: this.props.currentUser.get('digestView'),
      firstName: this.props.currentUser.get('firstName'),
      lastName: this.props.currentUser.get('lastName'),
      email: this.props.currentUser.get('email'),
      username: this.props.currentUser.get('userName'),
      avatarUrl: this.props.currentUser.get('avatarUrl'),
      // contacts: this.props.currentUser.get('contacts'),
      contactEmail: this.refs.contactEmail.value
    };

    this.props.dispatch(addNewContact(formData));

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

    xmlhttp.open('POST', 'api/contacts', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(requestBuildQueryString(formData));
  }

  render() {
    return (
      <span>
        <div className="mdl-cell mdl-cell--12-col">
          <hr />
          <h4 className="settings-h4">Your Contact List Settings</h4>
          <h5 className="settings-h5">Add A New Contact</h5>
        </div>

        {/* Add A New Contact */}
        <form action="" onSubmit={this.handleSubmit}>
          <div className="mdl-cell mdl-cell--4-col">
            <input className="settings-add-contact-input" type="text" ref="contactEmail" id="email" name="email" placeholder="email address" />
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <button type="submit" className="mdl-button mdl-js-button mdl-button--raised editor-form-button">Save</button>
          </div>
        </form>


        {/* View / Edit Contacts */}
        <div className="mdl-cell mdl-cell--4-col">
          <h5>Edit Contacts</h5>
          <table className="mdl-data-table mdl-js-data-table settings-contact-table">
            <thead>
              <tr>
                <th className="mdl-data-table__cell--non-numeric">Email Address</th>
                <th className="mdl-data-table__cell--non-numeric">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">john@example.com</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon settings-delete-contact-button">
                    <i className="material-icons md-18">delete</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">paul@example.com</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon settings-delete-contact-button">
                    <i className="material-icons md-18">delete</i>
                  </button>
                </td>
              </tr>
              <tr>
                <td className="mdl-data-table__cell--non-numeric">ringo@example.com</td>
                <td className="mdl-data-table__cell--non-numeric">
                  <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon settings-delete-contact-button">
                    <i className="material-icons md-18">delete</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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

export default connect( mapState )( SettingsContacts )
