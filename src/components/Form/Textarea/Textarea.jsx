import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Textarea extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
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
    event.persist()
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
   */
  handleValidation (event) {
    const value = this.state.value
    if (value.length) {
      const errors = this.props.onError(value, this.constructor.errors.map(err => {
        return {
          code: err.code,
          valid: err.func(value, this.props)
        }
      })) || []

      this.setState({ error: errors.some(x => !x.valid), valid: errors.every(x => x.valid) })
    }
  }

  /**
   * Generated name for the error message.
   */
  errorName () {
    return '' + this.props.name + '-error'
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
               htmlFor={this.state.uid}>
          {this.props.label}
        </label>
        <textarea className={this.inputClass()}
                  id={this.state.uid}
                  name={this.props.name}
                  aria-describedby={this.errorName()}
                  disabled={this.props.disabled}
                  maxLength={this.props.maxlength}
                  pattern={this.props.pattern}
                  readOnly={this.props.readonly}
                  required={this.props.required}
                  value={this.state.value}
                  onChange={this.handleChange}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  />
      </div>
    )
  }
}

Textarea.defaultProps = {
  name: 'textarea',
  value: '',
  focus: false,
  error: false,
  valid: false,
  onError: (value, arr) => { return arr }
}

Textarea.errors = [
  {
    code: 'length',
    func: (value, props) => {
      return value.length >= parseInt(props.minlength || 0) &&
        value.length <= parseInt(props.maxlength || 256)
    }
  },
  {
    code: 'pattern',
    func: (value, props) => {
      const re = new RegExp(props.pattern)
      return re.test(value)
    }
  }
]
