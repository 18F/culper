import React from 'react'
import ValidationElement from '../ValidationElement'
import Number from '../Number'

export default class Weight extends ValidationElement {
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
      valid: props.valid || false
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate(parseInt(this.state.value))
      }
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
      <div className="weight">
        <h2>Weight</h2>
        <div className="usa-form-group">
          <Number id={this.partName('feet')}
            name={this.state.name}
            label="Pounds"
            placeholder="0"
            aria-describedby={this.errorName('weight')}
            help="Weight must be a number between 10 and 999"
            disabled={this.state.disabled}
            max="999"
            maxlength="3"
            min="10"
            readonly={this.state.readonly}
            required={this.state.required}
            step="1"
            value={this.state.value}
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
