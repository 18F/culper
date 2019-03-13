import React from 'react'

import { PSYCHOLOGICAL, PSYCHOLOGICAL_REVIEW } from 'config/formSections/psychological'

import ConnectedCompetence from '../Competence/Competence'
import ConnectedConsultation from '../Consultation/Consultation'
import ConnectedHospitalizations from '../Hospitalizations/Hospitalizations'
import ConnectedDiagnoses from '../Diagnoses/Diagnoses'
import ConnectedExistingConditions from '../ExistingConditions/ExistingConditions'

import connectPsychologicalSection from '../PsychologicalConnector'

const sectionConfig = {
  section: PSYCHOLOGICAL.name,
  store: PSYCHOLOGICAL.store,
  subsection: PSYCHOLOGICAL_REVIEW.name,
}

const Review = ({ forPrint = false, showExistingConditions = true }) => {
  const subsectionProps = {
    required: true,
    scrollIntoView: false,
    scrollToBottom: undefined,
    defaultState: !forPrint,
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

export default connectPsychologicalSection(Review, sectionConfig)
