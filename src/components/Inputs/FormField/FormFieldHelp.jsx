import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'util/i18n'
import FormFieldMessage from './FormFieldMessage'

const FormFieldHelp = ({
  id, message, title, toggle,
}) => {
  const helpMessage = message || i18n.m(`${id}.message`)
  const helpTitle = title || i18n.t(`${id}.title`)
  const helpNote = i18n.m(`${id}.note`)

  return (
    <div className="usa-alert usa-alert-info" role="alert">
      <div className="usa-alert-body">
        <FormFieldMessage
          id={id}
          title={helpTitle}
          message={helpMessage}
          note={helpNote}
        />

        {toggle && (
          <button
            type="button"
            className="close"
            onClick={toggle}
            title={i18n.t('help.close')}
          >
            {i18n.t('help.close')}
          </button>
        )}
      </div>
    </div>
  )
}

FormFieldHelp.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.node,
  title: PropTypes.node,
  toggle: PropTypes.func,
}

FormFieldHelp.defaultProps = {
  message: null,
  title: null,
  toggle: null,
}

export default FormFieldHelp
