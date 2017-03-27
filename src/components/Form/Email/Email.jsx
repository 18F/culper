import React from 'react'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'

export default class Email extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      pattern: props.pattern,
      value: props.value,
      focus: props.focus,
      error: props.error,
      valid: props.valid
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          value: this.state.value
        })
      }
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
  handleValidation (event, status, errors) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status, errors)
    })
  }

  render () {
    return (
      <Generic name={this.props.name}
               label={this.props.label}
               placeholder={this.props.placeholder}
               className={`email ${this.props.className || ''}`.trim()}
               type="email"
               disabled={this.props.disabled}
               maxlength={this.props.maxlength}
               pattern={this.state.pattern}
               readonly={this.props.readonly}
               required={this.props.required}
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

Email.defaultProps = {
  pattern: `^([A-z0-9_\.-]+)@([\dA-z\.-]+)\.+([A-z\.]{2,6})$`,
  value: '',
  focus: false,
  error: false,
  valid: false
}
