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
               placeholder={this.props.placeholder}
               className={this.props.className}
               disabled={this.props.disabled}
               onChange={this.props.onChange}
               onValidate={this.props.onValidate}
               onBlur={this.props.onBlur}
               onFocus={this.props.onFocus}
               value={this.props.value}
               required={this.props.required}
               onUpdate={this.props.onUpdate}
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
                  placeholder={this.props.placeholder}
                  className={this.props.className}
                  disabled={this.props.disabled}
                  onChange={this.props.onChange}
                  onValidation={this.props.onValidation}
                  onBlur={this.props.onBlur}
                  onFocus={this.props.onFocus}
                  required={this.props.required}
                  onUpdate={this.props.onUpdate}
                  >
          <option value="">{this.props.placeholder}</option>
          <option value="AA">U.S. Armed Forces - Americas</option>
          <option value="AE">U.S. Armed Forces - Europe</option>
          <option value="AP">U.S. Armed Forces - Pacific</option>
        </Dropdown>
      )
    }
  }
}
