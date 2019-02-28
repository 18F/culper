import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'

import i18n from 'util/i18n'

import * as formConfig from 'config/forms'

import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'
import Intro from 'components/Section/History/Intro'
import ResidenceWrapper from 'components/Section/History/Residence/ResidenceWrapper'
import ConnectedResidence from 'components/Section/History/Residence'
import EmploymentWrapper from 'components/Section/History/Employment/EmploymentWrapper'
import ConnectedEmployment from 'components/Section/History/Employment'
import EducationWrapper from 'components/Section/History/Education/EducationWrapper'
import ConnectedEducation from 'components/Section/History/Education'
import FederalWrapper from 'components/Section/History/Federal/FederalWrapper'
import ConnectedFederal from 'components/Section/History/Federal'
import Review from 'components/Section/History/Review'

import { Show, Branch } from 'components/Form'

const History = (props) => {
  const { subsection, location } = props

  const subsectionClasses = classnames(
    'view',
    `view-${subsection}`,
  )

  const isReview = subsection === 'review'
  const title = isReview && i18n.t('review.title')
  const para = isReview && i18n.m('review.para')

  return (
    <div className="history">
      <div className="section-view">
        {title && <h1 className="title">{title}</h1>}
        {para}

        <div className={subsectionClasses}>
          {isReview && (
            <div className="top-btns"><ErrorList /></div>
          )}

          <Route path="/form/history/intro" component={Intro} />
          <Route path="/form/history/residence" component={ResidenceWrapper} />
          <Route path="/form/history/employment" component={EmploymentWrapper} />
          <Route path="/form/history/education" component={EducationWrapper} />
          <Route path="/form/history/federal" component={FederalWrapper} />
          <Route path="/form/history/review" component={Review} />

          <SectionNavigation
            currentPath={location.pathname}
          />
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  const { section, authentication } = state
  const { formType } = authentication

  return {
    ...section,
    formType,
  }
}

/* eslint react/forbid-prop-types: 0 */
History.propTypes = {
  subsection: PropTypes.string,
  location: PropTypes.object,
}

History.defaultProps = {
  subsection: 'intro',
  location: {},
}

export default connect(mapStateToProps)(History)

export const HistorySections = (props) => {
  const { formType, onError, Education } = props

  const formTypeConfig = formType && formConfig[formType]
  const residenceYears = formTypeConfig && formTypeConfig.HISTORY_RESIDENCE_YEARS
  const employmentYears = formTypeConfig && formTypeConfig.HISTORY_EMPLOYMENT_YEARS
  const employmentRecordYears = formTypeConfig && formTypeConfig.HISTORY_EMPLOYMENT_RECORD_YEARS
  const educationYears = formTypeConfig && formTypeConfig.HISTORY_EDUCATION_YEARS

  return (
    <div className="history">
      <ConnectedResidence
        defaultState={false}
        realtime
        overrideInitial
        onError={onError}
        scrollIntoView={false}
        required
        totalYears={residenceYears}
      />

      <ConnectedEmployment
        defaultState={false}
        realtime
        overrideInitial
        onError={onError}
        scrollIntoView={false}
        required
        totalYears={employmentYears}
        recordYears={employmentRecordYears}
      />

      <Branch
        name="branch_school"
        {...Education.HasAttended}
        label={i18n.t('history.education.label.attendance', { educationYears })}
        labelSize="h3"
      />
      <Show when={Education.HasAttended.value === 'No'}>
        <Branch
          name="branch_degree10"
          {...Education.HasDegree10}
          label={i18n.t('history.education.label.degree10', { educationYears })}
          labelSize="h3"
        />
      </Show>
      <Show
        when={
          Education.HasAttended.value === 'Yes'
          || Education.HasDegree10.value === 'Yes'
        }
      >
        <ConnectedEducation
          defaultState={false}
          realtime
          overrideInitial
          onError={onError}
          scrollIntoView={false}
          required
          totalYears={educationYears}
        />
      </Show>

      <hr className="section-divider" />
      <ConnectedFederal
        defaultState={false}
        onError={onError}
        scrollIntoView={false}
      />
    </div>
  )
}
