import React from 'react'
import ValidationElement from '../ValidationElement'
import { ariaLabel } from '../Generic'

export default class Textarea extends ValidationElement {
  constructor(props) {
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
  handleChange(event) {
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
  handleFocus(event) {
    event.persist()
    this.setState({ focus: true }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur(event) {
    event.persist()
    this.setState({ focus: false }, () => {
      super.handleBlur(event)
    })
  }

  /**
   * Execute validation checks on the value.
   */
  handleValidation(event) {
    const value = `${this.state.value}`.trim()
    const errors =
      this.props.onError(
        value,
        this.constructor.errors.map(err => {
          return {
            code: err.code,
            valid: err.func(value, this.props),
            uid: this.state.uid
          }
        })
      ) || []

    this.setState({
      error: errors.some(x => x.valid === false),
      valid: errors.every(x => x.valid === true)
    })
  }

  /**
   * Generated name for the error message.
   */
  errorName() {
    return '' + this.props.name + '-error'
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass() {
    let klass = this.props.className || ''

    if (this.state.error) {
      klass += ' usa-input-error'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the label element.
   */
  labelClass() {
    let klass = ''

    if (this.state.error) {
      klass += ' usa-input-error-label'
    }

    return klass.trim()
  }

  /**
   * Style classes applied to the input element.
   */
  inputClass() {
    let klass = ''

    if (this.state.focus) {
      klass += ' usa-input-focus'
    }

    if (this.state.valid) {
      klass += ' usa-input-success'
    }

    return klass.trim()
  }

  render() {
    return (
      <div className={this.divClass()}>
        <label className={this.labelClass()} htmlFor={this.state.uid}>
          {this.props.label}
        </label>
        <textarea
          className={this.inputClass()}
          id={this.state.uid}
          name={this.props.name}
          aria-describedby={this.errorName()}
          aria-label={this.props.label || ariaLabel(this.refs.textarea)}
          disabled={this.props.disabled}
          maxLength={this.props.maxlength}
          pattern={this.props.pattern}
          readOnly={this.props.readonly}
          autoCapitalize={this.props.autocapitalize}
          autoCorrect={this.props.autocorrect}
          autoComplete={this.props.autocomplete}
          spellCheck={this.props.spellcheck}
          required={this.props.required}
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref="textarea"
        />
        <div className="textarea-print print-only">{this.state.value}</div>
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
  minlength: 0,
  maxlength: 4000,
  spellcheck: true,
  autocapitalize: true,
  autocorrect: true,
  autocomplete: true,
  onError: (value, arr) => {
    return arr
  }
}

Textarea.errors = [
  {
    code: 'required',
    func: (value, props) => {
      if (props.required) {
        return !!value
      }
      return true
    }
  },
  {
    code: 'length',
    func: (value, props) => {
      if (!value || !value.length) {
        return null
      }
      return (
        value.length >= parseInt(props.minlength || 0) &&
        value.length <= parseInt(props.maxlength || 4000)
      )
    }
  },
  {
    code: 'pattern',
    func: (value, props) => {
      if (!value || !value.length) {
        return null
      }
      const re = new RegExp(props.pattern)
      return re.test(value)
    }
  }
]
