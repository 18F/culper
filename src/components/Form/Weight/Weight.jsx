import React from 'react'
import { i18n } from '../../../config'
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
      if (this.props.onUpdate) {
        this.props.onUpdate(parseInt(this.state.value))
      }
    })
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, errors) {
    this.setState({error: status === false, valid: status === true, errors: errors}, () => {
      let e = { [this.state.name]: errors }
      let s = { [this.state.name]: { status: status } }
      super.handleValidation(event, s, e)
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
        <h2>{this.props.label}</h2>
        <div className="eapp-field-wrap pounds">
          <Number id={this.partName('pounds')}
                  name="pounds"
                  label={i18n.t('identification.traits.label.pounds')}
                  placeholder={i18n.t('identification.traits.placeholder.pounds')}
                  aria-describedby={this.errorName('weight')}
                  help={i18n.t('identification.traits.help.pounds')}
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
