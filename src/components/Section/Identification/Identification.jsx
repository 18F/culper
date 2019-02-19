import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'

import AuthenticatedView from '../../../views/AuthenticatedView'

import { i18n } from '@config'

import { ErrorList } from '@components/ErrorList'
import SectionNavigation from '../shared/SectionNavigation'

import * as sections from '@constants/sections'

import Intro from './Intro'
import ApplicantName from './ApplicantName'
import ApplicantBirthDate from './ApplicantBirthDate'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantSSN from './ApplicantSSN'
import OtherNames from './OtherNames'
import ContactInformation from './ContactInformation'
import Physical from './Physical'
import Review from './Review'

/**
 * TODO
 * - subsection prop is not defaulting to "intro" after login, this is prob related to keeping redux in sync with routes. Investigate & fix this.
 */

class Identification extends React.Component {
  render() {
    const subsection = this.props.subsection || 'intro'

    const subsectionClasses = `view view-${subsection || 'unknown'}`

    const isReview = subsection === 'review'
    const title = isReview && i18n.t('review.title')
    const para = isReview && i18n.m('review.para')

    /** TODO - this should come from Redux store */
    const formType = 'SF86'

    return (
      <div className="section-view">
        {title && <h1 className="title">{title}</h1>}
        {para}

        <div className={subsectionClasses}>
          {isReview && (
            <div className="top-btns"><ErrorList /></div>
          )}

          <Route path="/form/identification/intro" component={Intro} />
          <Route path="/form/identification/name" component={ApplicantName} />
          <Route path="/form/identification/birthdate" component={ApplicantBirthDate} />
          <Route path="/form/identification/birthplace" component={ApplicantBirthPlace} />
          <Route path="/form/identification/ssn" component={ApplicantSSN} />
          <Route path="/form/identification/othernames" component={OtherNames} />
          <Route path="/form/identification/contacts" component={ContactInformation} />
          <Route path="/form/identification/physical" component={Physical} />
          <Route path="/form/identification/review" component={Review} />

          <SectionNavigation
            section={sections.IDENTIFICATION}
            subsection={subsection}
            formType={formType} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { section } = state
  return {
    ...section,
  }
}

Identification.defaultProps = {
  subsection: 'intro',
}

export default connect(mapStateToProps)(AuthenticatedView(Identification))

export const IdentificationSections = () => <Review />
