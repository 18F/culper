import React from 'react'
import Offenses from '../Police/Offenses'
import OtherOffenses from '../Police/OtherOffenses'
import DomesticViolenceList from '../Police/DomesticViolenceList'
import { History, Revoked, Debarred } from '../Investigations'
import NonCriminalCourtActions from '../NonCriminalCourtActions'
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

const Review = () => {
  const props = {
    required: true,
    scrollIntoView: false,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  return (
    <div>
      <Offenses {...props} />
      {sectionDivider}
      <OtherOffenses {...props} />
      {sectionDivider}
      <DomesticViolenceList {...props} />
      {sectionDivider}
      <History {...props} />
      {sectionDivider}
      <Revoked {...props} />
      {sectionDivider}
      <Debarred {...props} />
      {sectionDivider}
      <NonCriminalCourtActions {...props} />
      {sectionDivider}
      <Unauthorized {...props} />
      {sectionDivider}
      <Manipulating {...props} />
      {sectionDivider}
      <Unlawful {...props} />
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

export default Review
