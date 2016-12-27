import React from 'react'
import ValidationElement from '../ValidationElement'
import Number from '../Number'

export default class Height extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name || 'height',
      label: props.label,
      placeholder: props.placeholder,
      help: props.help,
      required: props.required,
      value: props.value,
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
   * Handle the validation event.
   */
  handleValidation (event, status) {
    this.setState({error: status === false, valid: status === true}, () => {
      super.handleValidation(event, status)
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
   * Generated name for the error message.
   */
  errorName (part) {
    return '' + this.state.name + '-' + part + '-error'
  }

  /**
   * Generated name for the part of the address elements.
   */
  partName (part) {
    return '' + this.state.name + '-' + part
  }

  render () {
    return (
      <div className="height">
        <h2>Height</h2>
        <div className="usa-form-group">
          <Number id={this.partName('feet')}
            name={this.partName('feet')}
            label="feet"
            placeholder="0"
            help="Feet must be a number between 1 and 9"
            aria-describedby={this.errorName('feet')}
            disabled={this.state.disabled}
            max="9"
            maxlength="1"
            min="1"
            readonly={this.state.readonly}
            required={this.state.required}
            step="1"
            value={this.state.height}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onValidate={this.handleValidation}
          />
        </div>
        <div className="usa-form-group">
          <Number id={this.partName('inches')}
            name={this.partName('inches')}
            label="inches"
            placeholder="0"
            help="Inches must be a number between 0 and 11"
            aria-describedby={this.errorName('inches')}
            disabled={this.state.disabled}
            max="11"
            maxlength="2"
            min="0"
            readonly={this.state.readonly}
            required={this.state.required}
            step="1"
            value={this.state.inches}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onValidate={this.handleValidation}
          />
        </div>
      </div>
    )
  }
}
