import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const CheckboxInput = (props) => {
  const {
    label, uid, name, ariaLabel, disabled, error, readonly, value, className,
    valid, onChange, onFocus, onBlur, children,
  } = props

  // eslint-disable-next-line eqeqeq
  const checked = value == true

  const showError = !disabled && error

  const divClass = classnames(
    className,
    'block',
    {
      disabled,
      'usa-input-error': showError,
    }
  )

  const labelClass = classnames(
    'checkbox',
    {
      disabled,
      'usa-input-error-label': showError,
      checked,
    }
  )

  const inputClass = classnames({
    'usa-input-success': !disabled && valid,
  })

  return (
    <div className={divClass}>
      <input
        type="checkbox"
        className={inputClass}
        id={uid}
        name={name}
        value={value}
        checked={checked}
        aria-describedby={`${name}-error`}
        aria-label={ariaLabel || label}
        disabled={disabled}
        readOnly={readonly}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <label
        htmlFor={uid}
        className={labelClass}
      >
        {children}
        <span>{label}</span>
      </label>
    </div>
  )
}

CheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  error: PropTypes.bool,
  valid: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

CheckboxInput.defaultProps = {
  ariaLabel: null,
  children: null,
  value: '',
  error: false,
  valid: false,
  disabled: false,
  className: '',
  readonly: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
}

export default CheckboxInput
