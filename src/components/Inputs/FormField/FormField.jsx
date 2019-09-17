/**
 * Field component requirements:
 * - Wraps a form input
 * - Renders inside of .usa-form-control
 * - Renders an anchor ID so it can be linked to
 * - renders a label
 * - renders help text - displayed as internal state, icon toggle
 * - renders an error message
 * - renders the form input (children?)
 * - render modifiers
 *
 * TODO:
 * - data test ID
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import i18n from 'util/i18n'

const FormField = ({
  title, required, inputId, children, errors, helptext, toggleHelp, showHelp,
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

      {helptext && toggleHelp && (
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

      {helptext && showHelp && (
        <div className="messages help-messages">
          <div className="usa-alert usa-alert-info" role="alert">
            <div className="usa-alert-body">
              {helptext}
              {toggleHelp && (
                <button
                  type="button"
                  className="close"
                  onClick={toggleHelp}
                  title={i18n.t('help.close')}
                >
                  {i18n.t('help.close')}
                </button>
              )}
            </div>
          </div>
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
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  errors: PropTypes.array,
  helptext: PropTypes.node,
}

FormField.defaultProps = {
  errors: [],
  helptext: null,
}

export default FormField
