import React from 'react'
import { Generic } from './Generic'

export class Url extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      placeholder: props.placeholder,
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
    return (
      <Generic name={this.state.name}
               label={this.state.label}
               placeholder={this.state.placeholder}
               help={this.state.help}
               type="url"
               disabled={this.state.disabled}
               maxlength={this.state.maxlength}
               pattern={this.state.pattern}
               readonly={this.state.readonly}
               required={this.state.required}
               value={this.state.value}
               focus={this.state.focus}
               error={this.state.error}
               valid={this.state.valid}
               />
    )
  }
}
