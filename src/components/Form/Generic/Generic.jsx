import React from 'react'
import ValidationElement from '../ValidationElement'

export default class Generic extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      focus: props.focus || false,
      error: props.error || false,
      valid: props.valid || false,
      errorCode: null
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
      if (this.state.value && this.state.value.length > 0) {
        status = status && (this.state.value.length >= parseInt(this.props.minlength || 0) && this.state.value.length <= parseInt(this.props.maxlength || 256))
        if (!status) {
          errorCode = 'length'
        }
        hits++
      }

      if (this.props.pattern && this.props.pattern.length > 0) {
        try {
          let re = new RegExp(this.props.pattern)
          status = status && re.test(this.state.value)
          if (!status) {
            errorCode = 'pattern'
          }
          hits++
        } catch (e) {
          // Not a valid regular expression
        }
      }
    }

    // If nothing was tested then go back to neutral
    if (hits === 0) {
      status = null
    }

    // Set the internal state
    this.setState({error: status === false, valid: status === true, errorCode: errorCode}, () => {
      let prop = this.props.name || 'input'
      let e = { [prop]: errorCode }
      super.handleValidation(event, status, super.flattenObject(e))
    })
  }

  /**
   * Handle the key down event.
   */
  handleKeyDown (event) {
    event.persist()
    super.handleKeyDown(event)
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
    let klass = (this.props.className || '')

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

    if (this.state.error && this.props.help) {
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

  /**
   * Return a boolean value used for attributes which stutter.
   */
  redundant (flag, attribute) {
    return flag || false
  }

  render () {
    return (
      <div className={this.divClass()}>
        <label className={this.labelClass()}
               htmlFor={this.props.name}
               ref="label"
               >
          {this.props.label}
        </label>
        <input className={this.inputClass()}
               id={this.props.name}
               name={this.props.name}
               type={this.props.type}
               placeholder={this.props.placeholder}
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
               onKeyDown={this.handleKeyDown}
               onCopy={this.props.onCopy}
               onCut={this.props.onCut}
               onPaste={this.props.onPaste}
               ref="input"
               />
        <div className={this.errorClass()}>
          <i className="fa fa-exclamation"></i>
          {this.props.help}
        </div>
      </div>
    )
  }
}
