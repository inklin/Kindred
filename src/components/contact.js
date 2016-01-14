import React from 'react'

export default class Contact extends React.Component {

  render() {
    return (
        <tr>
          <td className="mdl-data-table__cell--non-numeric">{this.props.email}</td>
          <td className="mdl-data-table__cell--non-numeric">
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon settings-delete-contact-button">
              <i className="material-icons md-18">delete</i>
            </button>
          </td>
       </tr>
      )
  }
}