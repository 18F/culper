
import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from 'components/ErrorMessage'

/**
 *
 * @param {Array} errors An array of errors
 */
const ErrorMessageList = ({ errors, isWarning }) => (
  <div>
    {errors.map(error => (
      <ErrorMessage
        key={error.key}
        id={error.key}
        title={error.title}
        message={error.message}
        note={error.note}
        isWarning={isWarning}
      />
    ))}
  </div>
)

ErrorMessageList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object),
  isWarning: PropTypes.bool,
}

ErrorMessageList.defaultProps = {
  errors: [],
  isWarning: false,
}

export default ErrorMessageList
