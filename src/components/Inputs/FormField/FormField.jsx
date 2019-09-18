import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import FormFieldHelp from './FormFieldHelp'

const FormField = ({
  title, required, inputId, children, errors, help, toggleHelp, showHelp,
  className,
}) => {
  const classes = classnames(
    'field',
    'usa-form-control',
    { required },
    className,
  )

  const iconClasses = classnames(
    'toggle',
    { active: showHelp },
  )

  return (
    <div
      className={classes}
      name={inputId}
      data-uuid={inputId}
    >
      {title && (
        <h1 className="title">
          {title}
          {!required && <span className="optional">(Optional)</span>}
        </h1>
      )}

      {help && toggleHelp && (
        <button
          type="button"
          title="Show help"
          aria-label="Show help"
          className={iconClasses}
          onClick={toggleHelp}
        >
          Show help
        </button>
      )}

      {help && showHelp && (
        <div className="messages help-messages">
          <FormFieldHelp
            id={help}
            toggle={toggleHelp}
          />
        </div>
      )}

      {errors && errors.length > 0 && (
        <div className="messages error-messages" role="alert">
          {errors.map((e, i) => (
            <div
              className="message error usa-alert usa-alert-error"
              // eslint-disable-next-line react/no-array-index-key
              key={`${inputId}_errors_${i}`}
              role="alert"
            >
              <div className="usa-alert-body">{e}</div>
            </div>
          ))}
        </div>
      )}

      <div>
        {children}
      </div>
    </div>
  )
}

FormField.propTypes = {
  title: PropTypes.node,
  required: PropTypes.bool,
  inputId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  errors: PropTypes.array,
  help: PropTypes.string,
  toggleHelp: PropTypes.func,
  showHelp: PropTypes.bool,
  className: PropTypes.string,
}

FormField.defaultProps = {
  title: null,
  required: false,
  errors: [],
  help: null,
  toggleHelp: null,
  showHelp: false,
  className: null,
}

export default FormField
