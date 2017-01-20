import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Textarea extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
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
    event.persist()
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
    })
  }

  /**
   * Handle the focus event.
   */
  handleFocus (event) {
    event.persist()
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur (event) {
    event.persist()
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  /**
   * Execute validation checks on the value.
   *
   * Possible return values:
   *  1. null: In a neutral state
   *  2. false: Does not meet criterion and is deemed invalid
   *  3. true: Meets all specified criterion
   */
  handleValidation (event, status) {
    let errorCode = null

    event.persist()
    if (!event || !event.target) {
      super.handleValidation(event, status)
      return
    }

    let hits = 0
    status = true

    if (this.state.value) {
      hits++
      if (this.state.pattern && this.state.pattern.length > 0) {
        try {
          let re = new RegExp(this.state.pattern)
          status = status && re.test(this.state.value)
          if (!status) {
            errorCode = 'pattern'
          }
        } catch (e) {
          // Not a valid regular expression
        }
      }
      if (this.state.maxlength && parseInt(this.state.maxlength) > this.state.value.length) {
        status = false
      }
    }

    // If nothing was tested then go back to neutral
    if (hits === 0) {
      status = null
    }

    // Set the internal state
    this.setState({error: status === false, valid: status === true, errorCode: errorCode}, () => {
      let prop = this.state.name || 'textarea'
      let e = { [prop]: errorCode }
      super.handleValidation(event, status, super.flattenObject(e))
    })
  }

  /**
   * Generated name for the error message.
   */
  errorName () {
    return '' + this.state.name + '-error'
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass () {
    let klass = this.props.className || ''

    if (this.state.error) {
      klass += ' usa-input-error'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the label element.
   */
  labelClass () {
    let klass = ''

    if (this.state.error) {
      klass += ' usa-input-error-label'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the span element.
   */
  errorClass () {
    let klass = 'eapp-error-message'

    if (this.state.error) {
      klass += ' message'
    } else {
      klass += ' hidden'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the input element.
   */
  inputClass () {
    let klass = ''

    if (this.state.focus) {
      klass += ' usa-input-focus'
    }

    if (this.state.valid) {
      klass += ' usa-input-success'
    }

    return klass.trim()
  }

  render () {
    return (
      <div className={this.divClass()}>
        <label className={this.labelClass()}
               htmlFor={this.state.name}>
          {this.state.label}
        </label>
        <textarea className={this.inputClass()}
                  id={this.state.name}
                  name={this.state.name}
                  aria-describedby={this.errorName()}
                  disabled={this.state.disabled}
                  maxLength={this.state.maxlength}
                  pattern={this.state.pattern}
                  readOnly={this.state.readonly}
                  required={this.state.required}
                  value={this.state.value}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  />
        <div className={this.errorClass()}>
          <i className="fa fa-exclamation"></i>
          {this.state.help}
        </div>
      </div>
    )
  }
}
