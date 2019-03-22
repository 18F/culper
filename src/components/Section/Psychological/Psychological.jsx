import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { i18n } from 'config'

import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'

import Intro from './Intro'
import ConnectedCompetence from './Competence/Competence'
import ConnectedConsultation from './Consultation/Consultation'
import ConnectedHospitalizations from './Hospitalizations/Hospitalizations'
import ConnectedDiagnoses from './Diagnoses/Diagnoses'
import ConnectedExistingConditions from './ExistingConditions/ExistingConditions'
import Review from './Review'

const Psychological = (props) => {
  const { subsection, location } = props

  const subsectionClasses = classnames(
    'view',
    `view-${subsection}`
  )

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

        <Route path="/form/psychological/intro" component={Intro} />
        <Route path="/form/psychological/competence" component={ConnectedCompetence} />
        <Route path="/form/psychological/consultations" component={ConnectedConsultation} />
        <Route path="/form/psychological/hospitalizations" component={ConnectedHospitalizations} />
        <Route path="/form/psychological/diagnoses" component={ConnectedDiagnoses} />
        <Route path="/form/psychological/conditions" component={ConnectedExistingConditions} />
        <Route path="/form/psychological/review" component={Review} />

        <SectionNavigation currentPath={location.pathname} />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { section } = state

  return {
    ...section,
  }
}

Psychological.propTypes = {
  subsection: PropTypes.string,
  location: PropTypes.object,
}

Psychological.defaultProps = {
  subsection: 'intro',
  location: {},
}

export default connect(mapStateToProps)(Psychological)

export const PsychologicalSections = () => <Review />
