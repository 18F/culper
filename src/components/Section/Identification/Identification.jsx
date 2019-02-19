import React from 'react'
import { Route } from 'react-router'
import { connect } from 'react-redux'

import { i18n } from '@config'

import { ErrorList } from '@components/ErrorList'
import SectionNavigation from '@components/Section/shared/SectionNavigation'

import * as sections from '@constants/sections'

import Intro from '@components/Section/Identification/Intro'
import ApplicantName from '@components/Section/Identification/ApplicantName'
import ApplicantBirthDate from '@components/Section/Identification/ApplicantBirthDate'
import ApplicantBirthPlace from '@components/Section/Identification/ApplicantBirthPlace'
import ApplicantSSN from '@components/Section/Identification/ApplicantSSN'
import OtherNames from '@components/Section/Identification/OtherNames'
import ContactInformation from '@components/Section/Identification/ContactInformation'
import Physical from '@components/Section/Identification/Physical'
import Review from '@components/Section/Identification/Review'

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

export default connect(mapStateToProps)(Identification)

export const IdentificationSections = () => <Review />
