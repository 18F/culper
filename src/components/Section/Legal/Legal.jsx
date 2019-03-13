import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import classnames from 'classnames'

import { i18n } from 'config'
import { ErrorList } from 'components/ErrorList'
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

const Legal = ({ subsection, location }) => {
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
          <Route path="/form/legal/intro" component={Intro} />
          <Route path="/form/legal/police/intro" component={PoliceIntro} />
          <Route path="/form/legal/police/offenses" component={Offenses} />
          <Route path="/form/legal/police/additionaloffenses" component={OtherOffenses} />
          <Route path="/form/legal/police/domesticviolence" component={DomesticViolenceList} />
          <Route path="/form/legal/investigations/history" component={History} />
          <Route path="/form/legal/investigations/revoked" component={Revoked} />
          <Route path="/form/legal/investigations/debarred" component={Debarred} />
          <Route path="/form/legal/court" component={NonCriminalCourtActions} />
          <Route path="/form/legal/technology/unauthorized" component={Unauthorized} />
          <Route path="/form/legal/technology/manipulating" component={Manipulating} />
          <Route path="/form/legal/technology/unlawful" component={Unlawful} />
          <Route path="/form/legal/associations/terrorist-organization" component={TerroristOrganization} />
          <Route path="/form/legal/associations/engaged-in-terrorism" component={EngagedInTerrorism} />
          <Route path="/form/legal/associations/advocating" component={Advocating} />
          <Route path="/form/legal/associations/membership-overthrow" component={MembershipOverthrow} />
          <Route path="/form/legal/associations/membership-violence-or-force" component={MembershipViolence} />
          <Route path="/form/legal/associations/activities-to-overthrow" component={ActivitiesToOverthrow} />
          <Route path="/form/legal/associations/terrorism-association" component={TerrorismAssociation} />
          <Route path="/form/legal/review" component={Review} />

          <SectionNavigation currentPath={location.pathname} />
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { section, application = {} } = state

  const legal = application.Legal || {}
  const errors = application.Errors || {}
  const completed = application.Completed || {}
  const addressBooks = application.AddressBooks || {}

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
    ...section,
  }
}

Legal.propTypes = {
  subsection: PropTypes.string,
  location: PropTypes.object,
}

Legal.defaultProps = {
  subsection: 'intro',
  location: {},
}

export const LegalSections = () => <Review />

export default connect(mapStateToProps)(Legal)
