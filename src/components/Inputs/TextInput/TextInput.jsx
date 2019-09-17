/**
 * Input requirements
 * Generic text input (text, email, number, password)
*/
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { autotab } from 'components/Form/Generic'

const TextInput = (props) => {
  const {
    label, uid, name, type, placeholder, ariaLabel, disabled, error, maxlength,
    pattern, readonly, autocapitalize, autocorrect, autocomplete, spellcheck,
    value, clipboard, className, focus, valid, onChange, onFocus, onBlur,
    tabBack, tabNext,
  } = props

  const divClass = classnames(
    'hide-for-print',
    className,
    { 'usa-input-error': !disabled && error }
  )

  const labelClass = classnames({
    disabled,
    'usa-input-error-label': !disabled && error,
  })

  const inputClass = classnames({
    'usa-input-focus': !disabled && focus,
    'usa-input-success': !disabled && valid,
  }, className)

  const handleKeyDown = (e) => {
    autotab(e, maxlength, tabBack, tabNext)
  }

  const allowClipboard = (e) => {
    if (!clipboard) e.preventDefault()
  }

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className={divClass}>
      {label && (
        <label className={labelClass} htmlFor={uid}>{label}</label>
      )}
      <input
        type={type}
        className={inputClass}
        id={uid}
        name={name}
        value={value}
        placeholder={placeholder}
        aria-describedby={`${name}-error`}
        aria-label={ariaLabel || label}
        disabled={disabled}
        maxLength={maxlength}
        pattern={pattern}
        readOnly={readonly}
        autoCapitalize={autocapitalize}
        autoCorrect={autocorrect}
        autoComplete={autocomplete}
        spellCheck={spellcheck}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        onCopy={allowClipboard}
        onCut={allowClipboard}
        onPaste={allowClipboard}
      />
      {/* for print CSS */}
      <div className="text-print print-only">{value}</div>
    </div>
  )
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'number', 'password']),
  value: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  valid: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  clipboard: PropTypes.bool,
  spellcheck: PropTypes.bool,
  autocapitalize: PropTypes.bool,
  autocorrect: PropTypes.bool,
  autocomplete: PropTypes.bool,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

TextInput.defaultProps = {
  ariaLabel: null,
  type: 'text',
  value: '',
  placeholder: '',
  error: false,
  valid: false,
  disabled: false,
  className: '',
  clipboard: true,
  spellcheck: true,
  autocapitalize: true,
  autocorrect: true,
  autocomplete: true,
  readonly: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
}

export default TextInput
