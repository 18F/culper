import React from 'react'
import PropTypes from 'prop-types'

// Used by help text & errors to render a group of text
const FormFieldMessage = ({
  id, title, message, note,
}) => (
  <div data-i18n={id}>
    {title && (<h5 className="usa-alert-heading">{title}</h5>)}
    {message && <span>{message}</span>}
    {note && <em>{note}</em>}
  </div>
)

FormFieldMessage.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.node,
  message: PropTypes.node,
  note: PropTypes.node,
}

FormFieldMessage.defaultProps = {
  title: null,
  message: null,
  note: null,
}

export default FormFieldMessage
