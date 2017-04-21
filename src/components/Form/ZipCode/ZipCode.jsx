import React from 'react'
import ValidationElement from '../ValidationElement'
import Text from '../Text'

export default class ZipCode extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
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
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status, error)
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
      <Text name={this.props.name}
            ref="zipcode"
            label={this.props.label}
            placeholder={this.props.placeholder}
            className={this.props.className}
            minlength="5"
            maxlength="10"
            pattern="^\d{5}(?:[-\s]\d{4})?$"
            required="true"
            value={this.state.value}
            error={this.state.error}
            valid={this.state.valid}
            onChange={this.handleChange}
            onValidate={this.handleValidation}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            tabBack={this.props.tabBack}
            tabNext={this.props.tabNext}
            />
    )
  }
}

ZipCode.defaultProps = {
  value: '',
  error: false,
  valid: false
}
