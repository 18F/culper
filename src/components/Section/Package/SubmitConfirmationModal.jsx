import React from 'react'
import PropTypes from 'prop-types'
import i18n from 'util/i18n'

const SubmitConfirmationModal = ({ formName, handleCancel, handleSubmit }) => (
  <div className="submit-confirmation__blackout">
    <div className="submit-confirmation__modal">
      <h3>{i18n.t('application.validForm.submit', { formName })}</h3>
      <p>{i18n.m('application.submissionConfirmation.para', { formName })}</p>


      <div className="text-right">
        <button
          type="button"
          onClick={handleCancel}
          className="submit usa-button-secondary"
        >
          {i18n.t('application.submissionConfirmation.back')}
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="submit usa-button"
        >
          {i18n.t('application.submissionConfirmation.submit', { formName })}
        </button>
      </div>
    </div>
  </div>
)

SubmitConfirmationModal.propTypes = {
  formName: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default SubmitConfirmationModal
