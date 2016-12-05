import React from 'react'
import ValidationElement from '../validationElement'
import Dropdown from '../Dropdown'
import State from '../State'

export default class MilitaryState extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      help: props.help,
      disabled: props.disabled,
      maxlength: props.maxlength,
      pattern: props.pattern,
      readonly: props.readonly,
      required: props.required,
      value: props.value,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false
    }
  }

  render () {
    if (this.props.includeStates) {
      return (
        <State name={this.props.name}
               label={this.props.label}
               help={this.props.help}>
          <option value="AA">AA</option>
          <option value="AE">AE</option>
          <option value="AP">AP</option>
        </State>
      )
    } else {
      return (
        <Dropdown name={this.props.name}
                  label={this.props.label}
                  help={this.props.help}>
          <option value="">{this.props.placeholder}</option>
          <option value="AA">AA</option>
          <option value="AE">AE</option>
          <option value="AP">AP</option>
        </Dropdown>
      )
    }
  }
}
