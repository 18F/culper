import React from 'react'
import ValidationElement from '../ValidationElement'

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

export default class Generic extends ValidationElement {
  constructor(props) {
    super(props)

    this.state = {
      uid: `${this.props.name}-${super.guid()}`,
      value: props.value,
      focus: props.focus,
      error: props.error,
      valid: props.valid
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.errors = this.errors.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let updates = {}

    if (nextProps.value !== this.state.value) {
      updates = { ...updates, value: nextProps.value }
    }

    // If disabled, we clear the value and clear state
    if (nextProps.disabled) {
      updates = { value: '', valid: null, error: null }
    }

    if (updates.value !== undefined && updates.value !== this.state.value) {
      const errors = this.errors(updates.value, nextProps)
      updates.error = errors.some(x => x.valid === false)
      updates.valid = errors.every(x => x.valid === true)
    }

    this.setState(updates)
  }


  componentDidUpdate(prevProps) {
    // Written specifically for Email fields that are dependent on each other
    // If a fields requiredness changes, check validations again.
    if (this.props.required !== prevProps.required) {
      this.handleValidation()
    }
  }

  errors = (value, props = this.props) => (
    this.props.onError(
      value,
      this.constructor.errors.map(err => ({
        code: err.code,
        valid: err.func(value, props),
        uid: this.state.uid,
      }))
    ) || []
  )

  /**
   * Handle the change event.
   */
  handleChange = (event) => {
    event.persist()
    this.setState({
      value: event.target.value,
    }, () => {
      super.handleChange(event)
    })
  }

  /**
   * Handle the focus event.
   */
  handleFocus = (event) => {
    event.persist()
    this.setState({
      focus: true,
    }, () => {
      super.handleFocus(event)
    })
  }

  /**
   * Handle the blur event.
   */
  handleBlur = (event) => {
    event.persist()
    this.setState({
      focus: false,
      value: `${this.state.value}`.trim(),
    }, () => {
      super.handleChange(event)
      super.handleBlur(event)
    })
  }

  /**
   * Execute validation checks on the value.
   */
  handleValidation = () => {
    const errors = this.errors(`${this.state.value}`.trim())
    this.setState({
      error: errors.some(x => x.valid === false),
      valid: errors.every(x => x.valid === true),
    })
  }

  /**
   * Handle the key down event.
   */
  handleKeyDown = (event) => {
    autotab(
      event,
      this.props.maxlength,
      this.props.tabBack,
      this.props.tabNext,
    )
  }

  /**
   * Prevents clipboard events from making changes to the value of the elements
   */
  disallowClipboard = (event) => {
    event.preventDefault()
  }

  /**
   * Generated name for the error message.
   */
  errorName = () => (
    `${this.props.name || ''}-error`
  )

  /**
   * Style classes applied to the wrapper.
   */
  divClass = () => (
    `${this.props.className || ''} ${
      !this.props.disabled && this.state.error ? 'usa-input-error' : ''
    }`.trim()
  )

  /**
   * Style classes applied to the label element.
   */
  labelClass = () => {
    if (this.props.disabled) {
      return 'disabled'
    }

    return `${this.state.error ? 'usa-input-error-label' : ''}`.trim()
  }

  /**
   * Style classes applied to the input element.
   */
  inputClass = () => {
    if (this.props.disabled) {
      return null
    }

    return `${this.state.focus ? 'usa-input-focus' : ''} ${
      this.state.valid ? 'usa-input-success' : ''
    }`.trim()
  }

  render() {
    const labelText = this.props.label
    let label
    if (labelText) {
      label = (
        <label
          className={this.labelClass()}
          htmlFor={this.state.uid}
          ref="label">
          {this.props.label}
        </label>
      )
    }
    return (
      <div className={`hide-for-print ${this.divClass()}`}>
        {label}
        <input
          className={this.inputClass()}
          id={this.state.uid}
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
          value={this.state.value}
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
          {this.state.value}
        </div>
      </div>
    )
  }
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
  onError: (value, arr) => arr,
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
        value.length >= parseInt(props.minlength, 10)
        && value.length <= parseInt(props.maxlength, 10)
      )
    },
  },
  {
    code: 'pattern',
    func: (value, props) => {
      if (!value) {
        return null
      }

      const re = new RegExp(props.pattern)
      return re.test(value)
    },
  },
  {
    code: 'status',
    func: (value, props) => {
      if (!value) {
        return null
      }

      return props.status
    },
  },
]
