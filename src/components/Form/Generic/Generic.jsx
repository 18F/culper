import React from 'react'
import ValidationElement from '../ValidationElement'

export const autotab = (event, maxlength, back, next) => {
  const input = event.target
  const value = input.value
  const code = event.keyCode
  const backCodes = [8, 46]
  const nextCodes = [
    // 0 through 9
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57,

    // 0 through 9 on the numpad
    96, 97, 98, 99, 100, 101, 102, 103, 104, 105,

    // a through z
    65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90
  ]

  if (backCodes.includes(code) && value.length < 1) {
    back()
  } else if (nextCodes.includes(code) && value.length >= parseInt(maxlength, 10)) {
    next()
  }
}

export default class Generic extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      focus: props.focus,
      error: props.error,
      valid: props.valid,
      errorCode: null
    }

    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value === this.state.value) {
      return
    }
    this.setState({ value: nextProps.value })
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
      if (status && this.state.value && this.state.value.length > 0) {
        status = status && (this.state.value.length >= parseInt(this.props.minlength || 0) && this.state.value.length <= parseInt(this.props.maxlength || 256))
        if (!status) {
          errorCode = 'length'
        }
        hits++
      }

      if (status && this.props.pattern && this.props.pattern.length > 0) {
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
   * Handle the key up event.
   */
  handleKeyUp (event) {
    autotab(event, this.props.maxlength, this.props.tabBack, this.props.tabNext)
  }

  /**
   * Prevents clipboard events from making changes to the value of the elements
   */
  disallowClipboard (event) {
    event.preventDefault()
  }

  /**
   * Generated name for the error message.
   */
  errorName () {
    return `${this.props.name || ''}-error`
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass () {
    return `${this.props.className || ''} ${!this.props.disabled && (this.state.error || this.props.error) ? 'usa-input-error' : ''}`.trim()
  }

  /**
   * Style classes applied to the label element.
   */
  labelClass () {
    if (this.props.disabled) {
      return 'disabled'
    }

    return `${this.state.error || this.props.error ? 'usa-input-error-label' : ''}`.trim()
  }

  /**
   * Style classes applied to the input element.
   */
  inputClass () {
    if (this.props.disabled) {
      return null
    }

    return `${this.state.focus || this.props.focus ? 'usa-input-focus' : ''} ${this.state.valid || this.props.valid ? 'usa-input-success' : ''}`.trim()
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
               value={this.state.value}
               onChange={this.handleChange}
               onFocus={this.handleFocus}
               onBlur={this.handleBlur}
               onKeyUp={this.handleKeyUp}
               onCopy={this.props.clipboard ? this.props.onCopy : this.disallowClipboard}
               onCut={this.props.clipboard ? this.props.onCut : this.disallowClipboard}
               onPaste={this.props.clipboard ? this.props.onPaste : this.disallowClipboard}
               ref="input"
               />
      </div>
    )
  }
}

Generic.defaultProps = {
  value: '',
  focus: false,
  error: false,
  valid: false,
  errorCode: null,
  maxlength: 255,
  clipboard: true,
  tabNext: () => {},
  tabBack: () => {}
}
