import React from 'react'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class County extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      placeholder: props.placeholder,
      help: props.help,
      required: props.required,
      value: props.value,
      error: props.error || false,
      valid: props.valid || false,
      errors: []
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
   * Handle the validation event.
   */
  handleValidation (event, status, errors) {
    this.setState({error: status === false, valid: status === true, errors: errors}, () => {
      super.handleValidation(event, status, errors)
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

  render () {
    return (
      <Text name={this.state.name}
            label={this.state.label}
            placeholder={this.state.placeholder}
            help={this.state.help}
            minlength="2"
            maxlength="100"
            required="true"
            className="eapp-field-wrap"
            value={this.state.value}
            error={this.state.error}
            valid={this.state.valid}
            onChange={this.handleChange}
            onValidate={this.handleValidation}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            />
    )
  }
}
