import React from 'react'
import PropTypes from 'prop-types'

import { LEGAL, LEGAL_REVIEW } from 'config/formSections/legal'

import connectSubsection from 'components/Section/shared/SubsectionConnector'

import ConnectedOffenses from '../Police/Offenses'
import ConnectedOtherOffenses from '../Police/OtherOffenses'
import ConnectedDomesticViolenceList from '../Police/DomesticViolenceList'
import { History, Revoked, Debarred } from '../Investigations'
import ConnectedNonCriminalCourtActions from '../NonCriminalCourtActions'
import { Unauthorized, Manipulating, Unlawful } from '../Technology'
import {
  TerroristOrganization,
  MembershipOverthrow,
  MembershipViolence,
  EngagedInTerrorism,
  Advocating,
  ActivitiesToOverthrow,
  TerrorismAssociation,
} from '../Associations'

const sectionConfig = {
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_REVIEW.name,
}

export const Review = ({
  requireLegalOtherOffensesSection,
  requireLegalNonCriminalCourtSection,
  requireLegalTechnologySection,
}) => {
  const props = {
    required: true,
    scrollIntoView: false,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  return (
    <div>
      <ConnectedOffenses {...props} />

      {requireLegalOtherOffensesSection && (
        <span>
          {sectionDivider}
          <ConnectedOtherOffenses {...props} />
        </span>
      )}

      {sectionDivider}
      <ConnectedDomesticViolenceList {...props} />

      {sectionDivider}
      <History {...props} />
      {sectionDivider}
      <Revoked {...props} />
      {sectionDivider}
      <Debarred {...props} />

      {requireLegalNonCriminalCourtSection && (
        <span>
          {sectionDivider}
          <ConnectedNonCriminalCourtActions {...props} />
        </span>
      )}

      {requireLegalTechnologySection && (
        <span>
          {sectionDivider}
          <Unauthorized {...props} />
          {sectionDivider}
          <Manipulating {...props} />
          {sectionDivider}
          <Unlawful {...props} />
        </span>
      )}

      {sectionDivider}
      <TerroristOrganization {...props} />
      {sectionDivider}
      <EngagedInTerrorism {...props} />
      {sectionDivider}
      <Advocating {...props} />
      {sectionDivider}
      <MembershipOverthrow {...props} />
      {sectionDivider}
      <MembershipViolence {...props} />
      {sectionDivider}
      <ActivitiesToOverthrow {...props} />
      {sectionDivider}
      <TerrorismAssociation {...props} />
    </div>
  )
}

Review.propTypes = {
  requireLegalOtherOffensesSection: PropTypes.bool,
  requireLegalNonCriminalCourtSection: PropTypes.bool,
  requireLegalTechnologySection: PropTypes.bool,
}

Review.defaultProps = {
  requireLegalOtherOffensesSection: true,
  requireLegalNonCriminalCourtSection: true,
  requireLegalTechnologySection: true,
}

export default connectSubsection(Review, sectionConfig)
