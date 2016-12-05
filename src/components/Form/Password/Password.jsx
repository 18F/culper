import React from 'react'
import ValidationElement from '../validationElement'
import Generic from '../Generic'

export default class Password extends ValidationElement {
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

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
    })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status)
    })
  }

  render () {
    return (
      <Generic name={this.state.name}
               label={this.state.label}
               placeholder={this.state.placeholder}
               help={this.state.help}
               type="password"
               disabled={this.state.disabled}
               maxlength={this.state.maxlength}
               pattern={this.state.pattern}
               readonly={this.state.readonly}
               required={this.state.required}
               value={this.state.value}
               focus={this.state.focus}
               error={this.state.error}
               valid={this.state.valid}
               onChange={this.handleChange}
               onFocus={this.handleFocus}
               onBlur={this.handleBlur}
               onValidate={this.handleValidation}
               />
    )
  }
}
