
import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from 'components/ErrorMessage'

/**
 *
 * @param {Array} errors An array of errors
 */
const ErrorMessageList = ({ errors }) => (
  <div>
    {errors.map(error => (
      <ErrorMessage
        key={error.key}
        title={error.title}
        message={error.message}
        note={error.note}
      />
    ))}
  </div>
)

ErrorMessageList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object),
}

ErrorMessageList.defaultProps = {
  errors: [],
}

export default ErrorMessageList
