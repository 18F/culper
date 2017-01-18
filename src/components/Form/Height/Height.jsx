import React from 'react'
import { i18n } from '../../../config'
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
      feet: props.feet,
      inches: props.inches,
      error: props.error || false,
      valid: props.valid || false,
      errors: []
    }
  }

  /**
   * Handle the change event.
   */
  handleChange (field, event) {
    console.log(field)
    console.log(event.target.value)
    this.setState({ [field]: event.target.value }, () => {
      super.handleChange(event)

      if (this.props.onUpdate) {
        this.props.onUpdate({
          feet: parseInt(this.state.feet),
          inches: parseInt(this.state.inches)
        })
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
      <div className="height">
        <h2>{this.props.label}</h2>
        <div className="eapp-field-wrap feet">
          <Number id={this.partName('feet')}
                  name="feet"
                  label={i18n.t('identification.traits.label.feet')}
                  placeholder={i18n.t('identification.traits.placeholder.feet')}
                  help={i18n.t('identification.traits.help.feet')}
                  aria-describedby={this.errorName('feet')}
                  disabled={this.state.disabled}
                  max="9"
                  maxlength="1"
                  min="1"
                  readonly={this.state.readonly}
                  required={this.state.required}
                  step="1"
                  value={this.state.feet}
                  onChange={this.handleChange.bind(this, 'feet')}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onValidate={this.handleValidation}
                  />
        </div>
        <div className="eapp-field-wrap inches">
          <Number id={this.partName('inches')}
                  name="inches"
                  label={i18n.t('identification.traits.label.inches')}
                  placeholder={i18n.t('identification.traits.placeholder.inches')}
                  help={i18n.t('identification.traits.help.inches')}
                  aria-describedby={this.errorName('inches')}
                  disabled={this.state.disabled}
                  max="11"
                  maxlength="2"
                  min="0"
                  readonly={this.state.readonly}
                  required={this.state.required}
                  step="1"
                  value={this.state.inches}
                  onChange={this.handleChange.bind(this, 'inches')}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onValidate={this.handleValidation}
                  />
        </div>
      </div>
    )
  }
}
