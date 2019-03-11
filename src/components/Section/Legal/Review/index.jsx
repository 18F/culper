import React from 'react'
import { i18n } from 'config'
import { Field } from 'components/Form'
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
      <Field
        title={i18n.t('legal.police.heading.title')}
        titleSize="h4"
        optional
        className="no-margin-bottom"
      >
        {i18n.m('legal.police.para.intro1')}
        {i18n.m('legal.police.para.intro2')}
        {i18n.m('legal.police.para.intro3')}
      </Field>
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
