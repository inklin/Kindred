import React from 'react'
import { connect } from 'react-redux'
import { loadError, loadSuccess, addNewContact } from '../actions/account'

class SettingsContacts extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.sendFormData();
    var form = this.refs.newContactForm;
    form.reset();
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
  // just thinking through bringing CurrentUsers contacts into the form
    let contacts = ["test@example.com", "someonelse@example.com", "anotherperson@example.com"];

    // check to see if a new contact has been added and if so, add their email address to the table
    if (this.props.currentUser.get('contactEmail') !== undefined) { contacts.push(this.props.currentUser.get('contactEmail')) }

    let contactRows = contacts.map ( (contact) => {
      return (
        <tr>
          <td className="mdl-data-table__cell--non-numeric">{contact}</td>
          <td className="mdl-data-table__cell--non-numeric">
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon settings-delete-contact-button">
              <i className="material-icons md-18">delete</i>
            </button>
          </td>
        </tr>
      )
    })

    return (
      <span>
        <div className="mdl-cell mdl-cell--12-col">
          <hr />
          <h4 className="settings-h4">Your Contact List Settings</h4>
          <h5 className="settings-h5">Add A New Contact</h5>
        </div>

        {/* Add A New Contact */}
        <form ref="newContactForm" action="" onSubmit={this.handleSubmit}>
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
              {contactRows}
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
