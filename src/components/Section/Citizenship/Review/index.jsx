import React from 'react'

import { CITIZENSHIP, CITIZENSHIP_REVIEW } from 'config/formSections/citizenship'

import Status from '../Status'
import Multiple from '../Multiple'
import ConnectedPassports from '../Multiple/Passports'

import connectCitizenshipSection from '../CitizenshipConnector'

const sectionConfig = {
  section: CITIZENSHIP.name,
  store: CITIZENSHIP.store,
  subsection: CITIZENSHIP_REVIEW.name,
}

const Review = ({ requireCitizenshipForeignPassportsSection }) => {
  const subsectionProps = {
    required: true,
    scrollIntoView: false,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  return (
    <div>
      <Status {...subsectionProps} />
      {sectionDivider}
      <Multiple {...subsectionProps} />
      {requireCitizenshipForeignPassportsSection && sectionDivider}
      {requireCitizenshipForeignPassportsSection && <ConnectedPassports {...subsectionProps} />}
    </div>
  )
}

export default connectCitizenshipSection(Review, sectionConfig)
