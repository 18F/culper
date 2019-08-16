import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = ({
  errorKey, title, message, note,
}) => (
  <div
    className="message error usa-alert usa-alert-error"
    role="alert"
    aria-live="polite"
  >
    <div data-testid={errorKey} className="usa-alert-body">
      <div data-i18n={errorKey}>
        {title && (
          <h5 data-testid="title" className="usa-alert-heading">{title}</h5>
        )}
        {message && (
          <span data-testid="message">{message}</span>
        )}
        {note && (
          <em data-testid="note">{note}</em>
        )}
      </div>
    </div>
  </div>
)

ErrorMessage.propTypes = {
  errorKey: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  note: PropTypes.string,
}

ErrorMessage.defaultProps = {
  errorKey: '',
  title: '',
  message: '',
  note: '',
}

export default ErrorMessage
