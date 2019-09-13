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
  })

  const handleKeyDown = (e) => {
    autotab(e, maxlength, tabBack, tabNext)
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
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
      />
      <div className="text-print print-only">{value}</div>
    </div>
  )
}

TextInput.propTypes = {

}

export default TextInput
