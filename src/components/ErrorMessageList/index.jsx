
import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from 'components/ErrorMessage'

/**
 *
 * @param {Array} errors An array of errory keys
 * @param {object} errorMap An object with error keys and error values
 */
const ErrorMessageList = ({ errors, errorMap }) => (
  <div>
    {errors.map((errorKey) => {
      if (errorMap[errorKey]) {
        return errorMap[errorKey].errors.map((error) => {
          if (error.shouldDisplayError()) {
            return (
              <ErrorMessage
                errorKey={error.key || errorKey}
                title={error.title}
                message={error.message}
                note={error.note}
              />
            )
          }
          return null
        })
      }
      return null
    })}
  </div>
)

ErrorMessageList.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  errorMap: PropTypes.object,
}

ErrorMessageList.defaultProps = {
  errors: [],
  errorMap: {},
}

export default ErrorMessageList
