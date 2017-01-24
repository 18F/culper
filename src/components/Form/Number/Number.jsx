import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Number extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      name: props.name,
      label: props.label,
      placeholder: props.placeholder,
      help: props.help,
      disabled: props.disabled,
      min: props.min,
      max: props.max,
      maxlength: props.maxlength,
      readonly: props.readonly,
      required: props.required,
      step: props.step,
      value: props.value,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      errorCode: null
    }
  }

  componentWillReceiveProps (next) {
    this.setState({
      disabled: next.disabled,
      value: next.value
    })
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    event.persist()
    // Prevent non-numerical values from being entered
    if (!event.target.value.match(/^(\s*|\d+)$/)) {
      return
    }

    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          index: this.props.index,
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
   *
   * Possible return values:
   *  1. null: In a neutral state
   *  2. false: Does not meet criterion and is deemed invalid
   *  3. true: Meets all specified criterion
   */
  handleValidation (event, status) {
    if (status === false) {
      super.handleValidation(event, status, errorCode)
      return
    }

    let errorCode = null
    let hits = 0
    status = true

    if (this.state.value) {
      if (this.state.min) {
        status = status && parseInt(this.state.value) >= parseInt(this.state.min)
        if (status === false) {
          errorCode = 'min'
        }
        hits++
      }

      if (this.state.max) {
        status = status && parseInt(this.state.value) <= parseInt(this.state.max)
        if (status === false) {
          errorCode = 'max'
        }
        hits++
      }

      if (this.state.maxlength && this.state.maxlength > 0) {
        status = status && ('' + this.state.value).length <= parseInt(this.state.maxlength)
        if (status === false) {
          errorCode = 'length'
        }
        hits++
      }
    }

    // If nothing was tested then go back to neutral
    if (hits === 0) {
      status = null
    }

    // Set the internal state
    this.setState({error: status === false, valid: status === true, errorCode: errorCode}, () => {
      let prop = this.state.name || 'input'
      let e = { [prop]: errorCode }
      super.handleValidation(event, status, e)
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

    if (this.state.error && this.state.help) {
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
        <input className={this.inputClass()}
               id={this.state.name}
               name={this.state.name}
               type="text"
               placeholder={this.state.placeholder}
               aria-describedby={this.errorName()}
               disabled={this.state.disabled}
               maxLength={this.state.maxlength}
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
