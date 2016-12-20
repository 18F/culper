import React from 'react'
import ValidationElement from '../ValidationElement'
import Dropdown from '../Dropdown'
import State from '../State'

export default class MilitaryState extends ValidationElement {
  render () {
    if (this.props.includeStates) {
      return (
        <State name={this.props.name}
               label={this.props.label}
               help={this.props.help}
               disabled={this.props.disabled}
               onChange={this.props.onChange}
               onValidation={this.props.onValidation}
               onBlur={this.props.onBlur}
               onFocus={this.props.onFocus}
               >
          <option value="AA">AA</option>
          <option value="AE">AE</option>
          <option value="AP">AP</option>
        </State>
      )
    } else {
      return (
        <Dropdown name={this.props.name}
                  label={this.props.label}
                  help={this.props.help}
                  disabled={this.props.disabled}
                  onChange={this.props.onChange}
                  onValidation={this.props.onValidation}
                  onBlur={this.props.onBlur}
                  onFocus={this.props.onFocus}
                  >
          <option value="">{this.props.placeholder}</option>
          <option value="AA">AA</option>
          <option value="AE">AE</option>
          <option value="AP">AP</option>
        </Dropdown>
      )
    }
  }
}
