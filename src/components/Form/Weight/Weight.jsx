import React from 'react'
import { i18n } from '../../../config'
import ValidationElement from '../ValidationElement'
import Number from '../Number'

export default class Weight extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      error: props.error,
      valid: props.valid,
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
      let e = { [this.props.name]: errors }
      let s = { [this.props.name]: { status: status } }
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
    return '' + this.props.name + '-' + part + '-error'
  }

  /**
   * Generated name for the part of the address elements.
   */
  partName (part) {
    return '' + this.props.name + '-' + part
  }

  render () {
    return (
      <div className="weight">
        <div className="pounds">
          <Number id={this.partName('pounds')}
                  name="pounds"
                  label={i18n.t('identification.traits.label.pounds')}
                  placeholder={i18n.t('identification.traits.placeholder.pounds')}
                  aria-describedby={this.errorName('weight')}
                  disabled={this.props.disabled}
                  max="999"
                  maxlength="3"
                  min="10"
                  readonly={this.props.readonly}
                  required={this.props.required}
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

Weight.defaultProps = {
  value: '',
  error: false,
  valid: false
}
