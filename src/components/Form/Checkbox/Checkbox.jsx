import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { newGuid } from '../ValidationElement/helpers'
import { ariaLabel } from '../Generic'

export default class Checkbox extends React.Component {
  constructor(props) {
    super(props)

    this.uid = `${this.props.name}-${newGuid()}`

    this.state = {
      focus: false,
      error: false,
      valid: false
    }
  }

  componentDidMount () {
    this.handleValidation(this.props.checked)
  }

  /**
   * Update the value of the checkbox
   */
  update() {
    const checked = !this.props.checked
    const value = this.props.value

    if (this.props.onUpdate) {
      this.props.onUpdate({
        name: this.props.name,
        value,
        checked,
      })
    }

    this.handleValidation(checked)
  }

  /**
   * Handle the change event.
   */
  handleChange = (event) => {
    this.update()
  }

  /**
   * Handle the key press event.
   */
  handleKeyPress = (event) => {
    const allowedKeys = [' ', 'Enter']
    if (allowedKeys.includes(event.key)) {
      event.preventDefault()
      event.stopPropagation()
      this.update()
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
      this.handleValidation(this.props.checked)
      if (this.props.onBlur) {
        this.props.onBlur(event)
      }
    })
  }

  handleError = (value, arr = []) => {
    const errors =
      this.props.onError(
        value,
        this.constructor.errors.map(err => {
          return {
            code: err.code,
            valid: value ? err.func(value, this.props) : null,
            uid: this.uid
          }
        })
      ) || []

    this.setState({
      error: errors.some(x => !x.valid),
      valid: errors.every(x => x.valid)
    })
  }

  /**
   * Execute validation checks on the value.
   */
  handleValidation = (checked) => {
    this.handleError(checked)
  }

  /**
   * Style classes applied to the wrapper.
   */
  divClass() {
    return classnames(
      this.props.className,
      'block',
      {
        extended: this.props.children,
        disabled: this.props.disabled,
        'usa-input-error': this.state.error,
      }
    )
  }

  /**
   * Style classes applied to the label element.
   */
  labelClass() {
    return classnames(
      'checkbox',
      {
        'usa-input-error-label': this.state.error,
        'checked': this.props.checked,
        'no-toggle': this.props.toggle === 'false',
      }
    )
  }

  /**
   * Style classes applied to the input element.
   */
  inputClass() {
    return classnames({
      'usa-input-success': this.state.valid,
    })
  }

  render() {
    const { label, name, disabled, readonly, value, checked, children } = this.props

    const speech = this.props.ariaLabel
      ? this.props.ariaLabel
      : `${label} for ${ariaLabel(this.refs.checkbox)}`

    return (
      <div className={this.divClass()}>
        <input
          className={this.inputClass()}
          id={this.uid}
          name={name}
          type="checkbox"
          ref="checkbox"
          disabled={disabled}
          readOnly={readonly}
          value={value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyPress}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          checked={checked}
          aria-label={speech}
        />
        <label className={this.labelClass()} htmlFor={this.uid}>
          {children}
          <span>{label}</span>
        </label>
      </div>
    )
  }
}

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  readonly: PropTypes.bool,
  ariaLabel: PropTypes.string,
  value: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  toggle: PropTypes.string,
  onUpdate: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onError: PropTypes.func,
}

Checkbox.defaultProps = {
  name: 'checkbox_input',
  checked: false,
  onError: (value, arr) => {
    return arr
  }
}

Checkbox.errors = []

Checkbox.select = (selectedObj, listObj) => {
  let selected = selectedObj.value
  let list = [...((listObj || {}).values || [])]

  if (list.includes(selected)) {
    list.splice(list.indexOf(selected), 1)
  } else {
    list.push(selected)
  }

  return list
}
