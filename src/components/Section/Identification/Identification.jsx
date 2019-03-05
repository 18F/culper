import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { connect } from 'react-redux'

import { i18n } from 'config'

import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'

import { IDENTIFICATION } from 'constants/sections'
import * as formTypes from 'config/formTypes'

import Intro from 'components/Section/Identification/Intro'
import ApplicantName from 'components/Section/Identification/ApplicantName'
import ApplicantBirthDate from 'components/Section/Identification/ApplicantBirthDate'
import ApplicantBirthPlace from 'components/Section/Identification/ApplicantBirthPlace'
import ApplicantSSN from 'components/Section/Identification/ApplicantSSN'
import OtherNames from 'components/Section/Identification/OtherNames'
import ContactInformation from 'components/Section/Identification/ContactInformation'
import Physical from 'components/Section/Identification/Physical'
import Review from 'components/Section/Identification/Review'

/**
 * TODO
 * - subsection prop is not defaulting to "intro" after login.
 * this is prob related to keeping redux in sync with routes. Investigate & fix this.
 */

const Identification = ({ subsection, location, formType }) => {
  const subsectionLibrary = {
    intro: Intro,
    name: ApplicantName,
    birthdate: ApplicantBirthDate,
    birthplace: ApplicantBirthPlace,
    ssn: ApplicantSSN,
    othernames: OtherNames,
    contacts: ContactInformation,
    physical: Physical,
    review: Review,
  }

  const form = formTypes[formType]
  const section = form.find(s => (s.key === IDENTIFICATION))
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

        {section.subsections.map(sub => (
          <Route
            key={sub.key}
            path={`/form/${section.path}/${sub.path}`}
            component={subsectionLibrary[sub.name]}
          />
        ))}

        <SectionNavigation currentPath={location.pathname} />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { section } = state
  const auth = state.authentication || {}
  return {
    formType: auth.formType,
    ...section,
  }
}

Identification.propTypes = {
  subsection: PropTypes.string,
  location: PropTypes.object,
  formType: PropTypes.string.isRequired,
}

Identification.defaultProps = {
  subsection: 'intro',
  location: {},
}

export default connect(mapStateToProps)(Identification)

export const IdentificationSections = () => <Review />
