import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import classnames from 'classnames'

import { i18n } from 'config'
import { ErrorList } from 'components/ErrorList'
import * as formTypes from 'config/formTypes'
import { LEGAL } from 'constants/sections'
import SectionNavigation from 'components/Section/shared/SectionNavigation'
import Offenses from './Police/Offenses'
import OtherOffenses from './Police/OtherOffenses'
import DomesticViolenceList from './Police/DomesticViolenceList'
import { History, Revoked, Debarred } from './Investigations'
import { Unauthorized, Manipulating, Unlawful } from './Technology'
import NonCriminalCourtActions from './NonCriminalCourtActions'
import {
  TerroristOrganization,
  MembershipOverthrow,
  MembershipViolence,
  EngagedInTerrorism,
  Advocating,
  ActivitiesToOverthrow,
  TerrorismAssociation,
} from './Associations'
import Intro from './Intro'
import PoliceIntro from './Police/Intro'
import Review from './Review'

const Legal = ({ subsection, location, formType }) => {
  const subsectionLibrary = {
    intro: Intro,
    'police/intro': PoliceIntro,
    'police/offenses': Offenses,
    'police/additionalOffenses': OtherOffenses,
    'police/domesticViolence': DomesticViolenceList,
    'investigations/history': History,
    'investigations/revoked': Revoked,
    'investigations/debarred': Debarred,
    court: NonCriminalCourtActions,
    'technology/unauthorized': Unauthorized,
    'technology/manipulating': Manipulating,
    'technology/unlawful': Unlawful,
    'associations/terrorist-organization': TerroristOrganization,
    'associations/engaged-in-terrorism': EngagedInTerrorism,
    'associations/advocating': Advocating,
    'associations/membership-overthrow': MembershipOverthrow,
    'associations/membership-violence-or-force': MembershipViolence,
    'associations/activities-to-overthrow': ActivitiesToOverthrow,
    'associations/terrorism-association': TerrorismAssociation,
    review: Review,
  }

  const form = formTypes[formType]
  const section = form.find(s => (s.key === LEGAL))
  const flattenedSections = formTypes.reduceSubsections([section])
  const subsectionClasses = classnames(
    'view',
    `view-${subsection}`,
  )

  const isReview = subsection === 'review'
  const title = isReview && i18n.t('review.title')
  const para = isReview && i18n.m('review.para')

  return (
    <div className="legal">
      <div className="section-view">
        {title && <h1 className="title">{title}</h1>}
        {para}

        <div className={subsectionClasses}>
          {isReview && (
            <div className="top-btns"><ErrorList /></div>
          )}

          {flattenedSections.map(sub => (
            <Route
              key={sub.key}
              path={sub.fullPath}
              component={subsectionLibrary[sub.name]}
            />
          ))}

          <SectionNavigation currentPath={location.pathname} />
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { section, application = {}, authentication = {} } = state

  const legal = application.Legal || {}
  const errors = application.Errors || {}
  const completed = application.Completed || {}
  const addressBooks = application.AddressBooks || {}
  const settings = application.Settings || {}

  return {
    Legal: legal,
    Police: legal.Police || {},
    PoliceOffenses: legal.PoliceOffenses || {},
    PoliceOtherOffenses: legal.PoliceOtherOffenses || {},
    PoliceDomesticViolence: legal.PoliceDomesticViolence || {},
    History: legal.History || {},
    Revoked: legal.Revoked || {},
    Debarred: legal.Debarred || {},
    NonCriminalCourtActions: legal.NonCriminalCourtActions || {},
    Unauthorized: legal.Unauthorized || {},
    Manipulating: legal.Manipulating || {},
    Unlawful: legal.Unlawful || {},
    TerroristOrganization: legal.TerroristOrganization || {},
    MembershipOverthrow: legal.MembershipOverthrow || {},
    MembershipViolence: legal.MembershipViolence || {},
    EngagedInTerrorism: legal.EngagedInTerrorism || {},
    Advocating: legal.Advocating || {},
    ActivitiesToOverthrow: legal.ActivitiesToOverthrow || {},
    TerrorismAssociation: legal.TerrorismAssociation || {},
    Errors: errors.legal || [],
    Completed: completed.legal || [],
    AddressBooks: addressBooks,
    formType: settings.formType,
    ...section,
  }
}

Legal.propTypes = {
  subsection: PropTypes.string,
  location: PropTypes.object,
  formType: PropTypes.string,
}

Legal.defaultProps = {
  subsection: 'intro',
  location: {},
  formType: 'SF86',
}

export const LegalSections = () => <Review />

export default connect(mapStateToProps)(Legal)
