import React from 'react'
import PropTypes from 'prop-types'

import { CITIZENSHIP, CITIZENSHIP_REVIEW } from 'config/formSections/citizenship'

import ConnectedUsPassport from '../UsPassport'
import ConnectedStatus from '../Status'
import ConnectedMultiple from '../Multiple'
import ConnectedPassports from '../Multiple/Passports'

import connectCitizenshipSection from '../CitizenshipConnector'

const sectionConfig = {
  section: CITIZENSHIP.name,
  store: CITIZENSHIP.store,
  subsection: CITIZENSHIP_REVIEW.name,
}

export const Review = ({ requireCitizenshipForeignPassportsSection }) => {
  const subsectionProps = {
    required: true,
    scrollIntoView: false,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  return (
    <div>
      <ConnectedUsPassport {...subsectionProps} />
      {sectionDivider}
      <ConnectedStatus {...subsectionProps} />
      {sectionDivider}
      <ConnectedMultiple {...subsectionProps} />
      {requireCitizenshipForeignPassportsSection && sectionDivider}
      {requireCitizenshipForeignPassportsSection && <ConnectedPassports {...subsectionProps} />}
    </div>
  )
}

Review.propTypes = {
  requireCitizenshipForeignPassportsSection: PropTypes.bool,
}

Review.defaultProps = {
  requireCitizenshipForeignPassportsSection: true,
}

export default connectCitizenshipSection(Review, sectionConfig)
