import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { newGuid } from '../ValidationElement/helpers'

export const autotab = (event, maxlength, back, next) => {
  const input = event.target

  // If there is a selection (highlighted text) within the element then we
  // need to let normal operations take precedence.
  const highlighted =
    (input.selectionEnd || 0) - (input.selectionStart || 0) !== 0
  if (highlighted) {
    return
  }

  const value = input.value
  const code = event.keyCode
  const backCodes = [8, 46]
  const nextCodes = [
    // 0 through 9
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,

    // 0 through 9 on the numpad
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,

    // a through z
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90
  ]

  if (backCodes.includes(code) && value.length < 1) {
    back()
  } else if (
    nextCodes.includes(code) &&
    value.length >= parseInt(maxlength, 10)
  ) {
    next()
  }
}

// Find the closest element matching the query selector
export const closest = (el, selector) => {
  var matches
  ;[
    'matches',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
    'oMatchesSelector'
  ].some(function(fn) {
    if (typeof document.body[fn] === 'function') {
      matches = fn
      return true
    }
    return false
  })

  var parent
  while (el) {
    parent = el.parentElement
    if (parent && parent[matches](selector)) {
      return parent
    }
    el = parent
  }
  return null
}

// Find the closes element (field) with an aria-label applied
export const ariaLabel = el => {
  var nearest = closest(el, '.field')
  if (nearest) {
    return nearest.getAttribute('aria-label')
  }
  return null
}

export default class Generic extends React.Component {
  constructor(props) {
    super(props)

    this.uid = `${this.props.name}-${newGuid()}`

    this.state = {
      focus: props.focus,
      error: props.error,
      valid: false,
    }
  }

  componentDidMount () {
    this.handleValidation(this.props.value)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.disabled && nextProps.disabled) {
      // If disabled, clear state
      this.setState({
        focus: false,
        valid: false,
        error: false,
      })
    } else if (!this.state.focus && nextProps.value !== this.props.value) {
      // Value has changed externally, re-run validation
      const errors = this.errors(nextProps.value, nextProps)
      this.setState({
        error: errors.some(x => x.valid === false),
        valid: errors.every(x => x.valid === true),
      })
    }
  }

  // Validate value against potential errors
  errors = (value, props = this.props) => {
    return (
      props.onError(
        value,
        this.constructor.errors.map(err => {
          return {
            code: err.code,
            valid: err.func(value, props),
            uid: this.uid
          }
        })
      ) || []
    )
  }

  /**
   * Handle the change event.
   */
  handleChange = (event) => {
    event.persist()

    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  /**
   * Handle the focus event.
   */
  handleFocus = (event) => {
    event.persist()
    this.setState({ focus: true }, () => {
      if (this.props.onFocus) {
        this.props.onFocus(event)
      }
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur = (event) => {
    event.persist()
    this.setState({ focus: false }, () => {
      const trimmedValue = this.props.value.trim()
      event.target.value = trimmedValue

      if (this.props.onChange) {
        this.props.onChange(event)
      }

      this.handleValidation(trimmedValue)

      if (this.props.onBlur) {
        this.props.onBlur(event)
      }
    })
  }

  /**
   * Execute validation checks on the value.
   */
  handleValidation = (value) => {
    const errors = this.errors(value)

    this.setState({
      error: errors.some(x => x.valid === false),
      valid: errors.every(x => x.valid === true)
    })
  }

  /**
   * Handle the key down event.
   */
  handleKeyDown = (event) => {
    autotab(event, this.props.maxlength, this.props.tabBack, this.props.tabNext)
  }

  /**
   * Prevents clipboard events from making changes to the value of the elements
   */
  disallowClipboard(event) {
    event.preventDefault()
  }

  /**
   * Generated name for the error message.
   */
  errorName() {
    return `${this.props.name || ''}-error`
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass() {
    return classnames(
      'hide-for-print',
      this.props.className,
      {
        'usa-input-error': !this.props.disabled && this.state.error,
      }
    )
  }

  /**
   * Style classes applied to the label element.
   */
  labelClass() {
    return classnames({
      disabled: this.props.disabled,
      'usa-input-error-label': !this.props.disabled && this.state.error,
    })
  }

  /**
   * Style classes applied to the input element.
   */
  inputClass() {
    return classnames({
      'usa-input-focus': !this.props.disabled && this.state.focus,
      'usa-input-success': !this.props.disabled && this.state.valid,
    })
 }

  render() {
    const { disabled, value } = this.props

    const labelText = this.props.label
    let label
    if (labelText) {
      label = (
        <label
          className={this.labelClass()}
          htmlFor={this.uid}
          ref="label">
          {this.props.label}
        </label>
      )
    }

    const displayValue = disabled ? '' : value

    return (
      <div className={this.divClass()}>
        {label}
        <input
          className={this.inputClass()}
          id={this.uid}
          name={this.props.name}
          type={this.props.type}
          placeholder={this.props.placeholder}
          aria-describedby={this.errorName()}
          aria-label={
            this.props.ariaLabel ||
            this.props.label ||
            ariaLabel(this.refs.input)
          }
          disabled={this.props.disabled}
          maxLength={this.props.maxlength}
          pattern={this.props.pattern}
          readOnly={this.props.readonly}
          autoCapitalize={this.props.autocapitalize}
          autoCorrect={this.props.autocorrect}
          autoComplete={this.props.autocomplete}
          spellCheck={this.props.spellcheck}
          value={displayValue}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          onCopy={
            this.props.clipboard ? this.props.onCopy : this.disallowClipboard
          }
          onCut={
            this.props.clipboard ? this.props.onCut : this.disallowClipboard
          }
          onPaste={
            this.props.clipboard ? this.props.onPaste : this.disallowClipboard
          }
          ref="input"
        />
        <div className="text-print print-only">
          {displayValue}
        </div>
      </div>
    )
  }
}

Generic.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autocapitalize: PropTypes.bool,
  autocorrect: PropTypes.bool,
  autocomplete: PropTypes.bool,
  spellcheck: PropTypes.bool,
  clipboard: PropTypes.bool,
  minlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pattern: PropTypes.any,
  status: PropTypes.bool,
  onError: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  tabNext: PropTypes.func,
  tabBack: PropTypes.func,
  onCopy: PropTypes.func,
  onCut: PropTypes.func,
  onPaste: PropTypes.func,
}

Generic.defaultProps = {
  value: '',
  focus: false,
  error: false,
  valid: false,
  status: true,
  pattern: '.*',
  minlength: 0,
  maxlength: 255,
  clipboard: true,
  spellcheck: true,
  autocapitalize: true,
  autocorrect: true,
  autocomplete: true,
  ariaLabel: '',
  tabNext: () => {},
  tabBack: () => {},
  onError: (value, arr) => {
    return arr
  }
}

Generic.errors = [
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
      if (!value) {
        return null
      }
      return (
        value.length >= parseInt(props.minlength) &&
        value.length <= parseInt(props.maxlength)
      )
    }
  },
  {
    code: 'pattern',
    func: (value, props) => {
      if (!value) {
        return null
      }

      const re = new RegExp(props.pattern)
      return re.test(value)
    }
  },
  {
    code: 'status',
    func: (value, props) => {
      if (!value) {
        return null
      }

      return props.status
    }
  }
]
