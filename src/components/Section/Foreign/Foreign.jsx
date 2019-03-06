import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import { i18n } from 'config'
import * as formTypes from 'config/formTypes'
import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'
import Passport from 'components/Section/Foreign/Passport'
import Contacts from 'components/Section/Foreign/Contacts'
import Travel from 'components/Section/Foreign/Travel'
import {
  DirectActivity,
  IndirectActivity,
  RealEstateActivity,
  BenefitActivity,
  Support,
} from 'components/Section/Foreign/Activities'
import {
  Advice,
  Family,
  Employment,
  Ventures,
  Conferences,
  Contact,
  Sponsorship,
  Political,
  Voting,
} from 'components/Section/Foreign/Business'
import { FOREIGN } from 'constants/sections'
import Review from './Review'
import Intro from './Intro'

const Foreign = ({ subsection, location, formType }) => {
  const subsectionLibrary = {
    intro: Intro,
    passport: Passport,
    contacts: Contacts,
    direct: DirectActivity,
    indirect: IndirectActivity,
    realestate: RealEstateActivity,
    benefits: BenefitActivity,
    support: Support,
    advice: Advice,
    family: Family,
    employment: Employment,
    ventures: Ventures,
    conferences: Conferences,
    contact: Contact,
    sponsorship: Sponsorship,
    political: Political,
    voting: Voting,
    travel: Travel,
    review: Review,
  }
  const form = formTypes[formType]
  const section = form.find(s => (s.key === FOREIGN))
  const flattenedSections = formTypes.reduceSubsections([section])
  const subsectionClasses = `view view-${subsection || 'unknown'}`
  const isReview = subsection === 'review'
  const title = isReview && i18n.t('review.title')
  const para = isReview && i18n.m('review.para')

  return (
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
  )
}

function mapStateToProps(state) {
  const { authentication, section } = state

  return {
    formType: authentication.formType,
    ...section,
  }
}

Foreign.propTypes = {
  subsection: PropTypes.string,
  location: PropTypes.object,
  formType: PropTypes.string,
}

Foreign.defaultProps = {
  subsection: 'intro',
  location: {},
  formType: 'SF86',
}

export default connect(mapStateToProps)(Foreign)

export const ForeignSections = () => <Review />
