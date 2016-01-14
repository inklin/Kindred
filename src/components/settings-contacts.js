import React from 'react'

import Contact from './contact'

import { connect } from 'react-redux'
import { loadError, loadSuccess, addContact, deleteContact as deleteContactAction } from '../actions/contact'

class SettingsContacts extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.sendFormData();
    var form = this.refs.newContactForm;
    form.reset();
  }

  sendFormData = () => {
    var formData = {
      contactEmail: this.refs.contactEmail.value
    };

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
        if (xmlhttp.status === 200) {
          let payload = JSON.parse(xmlhttp.response)

          this.props.dispatch(loadSuccess())
          this.props.dispatch(addContact({
            id: payload.contact.id,
            email: formData.contactEmail
          }))
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

  deleteContact = (id) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200 ) {
          this.props.dispatch(deleteContactAction({
            id: id
          }))
        }
        else {
          this.props.dispatch(loadError())
        }
      }
    };

    xmlhttp.open('DELETE', `api/contacts/${id}`, true);
    xmlhttp.send();
  }

  render() {
    let contacts = []

    this.props.contacts.forEach ( (contact) => {
      contacts.push(
        <Contact
          id={contact.get('id')}
          key={contact.get('id')}
          email={contact.get('email')}
          deleteContact={this.deleteContact}
        />
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
              {contacts}
            </tbody>
          </table>
        </div>

      </span>
    )
  }
}

function mapState (state) {
  return {
    currentUser: state.currentUser,
    contacts: state.contacts
  }
}

export default connect( mapState )( SettingsContacts )
