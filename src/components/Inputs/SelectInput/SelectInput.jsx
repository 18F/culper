import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const SelectInput = (props) => {
  const {
    uid, name, value, error, valid, disabled, className,
    label, options, optional, onChange,
  } = props

  const wrapperClasses = classnames(
    className,
    { 'usa-input-error': error }
  )

  const selectClasses = classnames(
    { 'usa-input-success': valid }
  )

  return (
    <div className={wrapperClasses}>
      <label
        htmlFor={uid}
        className="title label"
      >
        {label}
        {optional && (
          <span className="optional">(optional)</span>
        )}
      </label>

      <select
        id={uid}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        className={selectClasses}
      >
        {options.map(o => (
          <option
            key={`${name}-option-${o.value}`}
            label={o.label}
            value={o.value}
          >
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  error: PropTypes.bool,
  valid: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  optional: PropTypes.bool,
  onChange: PropTypes.func,
}

SelectInput.defaultProps = {
  value: '',
  error: false,
  valid: false,
  disabled: false,
  className: '',
  optional: false,
  onChange: () => {},
}

export default SelectInput
