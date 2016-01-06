import React from 'react'
import AlloyEditorComponent from './alloy-editor'

export default class Editor extends React.Component {
  render() {
    return (
      <AlloyEditorComponent container='editable' alloyEditorConfig='null'>
      </AlloyEditorComponent>
    )
  }
}
