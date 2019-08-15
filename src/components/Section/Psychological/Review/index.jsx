import React from 'react'
import PropTypes from 'prop-types'

import { PSYCHOLOGICAL, PSYCHOLOGICAL_REVIEW } from 'config/formSections/psychological'

import connectSubsection from 'components/Section/shared/SubsectionConnector'

import ConnectedCompetence from '../Competence/Competence'
import ConnectedConsultation from '../Consultation/Consultation'
import ConnectedHospitalizations from '../Hospitalizations/Hospitalizations'
import ConnectedDiagnoses from '../Diagnoses/Diagnoses'
import ConnectedExistingConditions from '../ExistingConditions/ExistingConditions'

const sectionConfig = {
  section: PSYCHOLOGICAL.name,
  store: PSYCHOLOGICAL.store,
  subsection: PSYCHOLOGICAL_REVIEW.name,
}

const Review = ({ showExistingConditions = true }) => {
  const subsectionProps = {
    required: true,
    scrollIntoView: false,
    scrollToBottom: undefined,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  return (
    <div>
      <ConnectedCompetence {...subsectionProps} />
      {sectionDivider}
      <ConnectedConsultation {...subsectionProps} />
      {sectionDivider}
      <ConnectedHospitalizations {...subsectionProps} />
      {sectionDivider}
      <ConnectedDiagnoses {...subsectionProps} />

      {showExistingConditions && sectionDivider}
      {showExistingConditions && <ConnectedExistingConditions {...subsectionProps} />}
    </div>
  )
}

Review.propTypes = {
  showExistingConditions: PropTypes.bool,
}

Review.defaultProps = {
  showExistingConditions: true,
}

export default connectSubsection(Review, sectionConfig)
