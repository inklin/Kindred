import React from 'react'

export default class SettingsContacts extends React.Component {
  render() {
    return (
      <span>
        <div className="mdl-cell mdl-cell--12-col">
          <hr />
          <h4 className="settings-h4">Your Contact List Settings</h4>
          <h5 className="settings-h5">Add A New Contact</h5>
        </div>

        {/* Add A New Contact */}
          <div className="mdl-cell mdl-cell--4-col">
            <input className="settings-add-contact-input" type="text" id="email" name="email" placeholder="email address" />
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <button className="mdl-button mdl-js-button mdl-button--raised editor-form-button">Save</button>
          </div>


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
