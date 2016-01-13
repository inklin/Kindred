import React from 'react'
import SettingsPersonalInfo from './settings-personal-info'
import SettingsDigest from './settings-digest'
import SettingsContacts from './settings-contacts'

export default class Settings extends React.Component {
  render() {
    return (
      <span className="full-width">
        <SettingsPersonalInfo />
        <SettingsDigest />
        <SettingsContacts />
      </span>
    )
  }
}
