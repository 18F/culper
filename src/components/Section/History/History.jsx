import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { i18n } from 'config'

import { ErrorList } from 'components/ErrorList'
import SectionNavigation from 'components/Section/shared/SectionNavigation'

import * as sections from 'constants/sections'

import Intro from 'components/Section/History/Intro'
import ResidenceWrapper from 'components/Section/History/Residence/ResidenceWrapper'
import Residence from 'components/Section/History/Residence'
import EmploymentWrapper from 'components/Section/History/Employment/EmploymentWrapper'
import Employment from 'components/Section/History/Employment'
import EducationWrapper from 'components/Section/History/Education/EducationWrapper'
import ConnectedEducation from 'components/Section/History/Education'
import FederalWrapper from 'components/Section/History/Federal/FederalWrapper'
import Federal from 'components/Section/History/Federal'
import Review from 'components/Section/History/Review'

import { Show, Branch } from 'components/Form'

/**
 * TODO
 * - totalYears needs to change based on form type
 */

const History = (props) => {
  const { subsection } = props

  const subsectionClasses = classnames(
    'view',
    `view-${subsection}`
  )

  const isReview = subsection === 'review'
  const title = isReview && i18n.t('review.title')
  const para = isReview && i18n.m('review.para')

  /** TODO - this should come from Redux store */
  const formType = 'SF86'

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
            section={sections.HISTORY}
            subsection={subsection}
            formType={formType}
          />
        </div>
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

History.propTypes = {
  subsection: PropTypes.string,
}

History.defaultProps = {
  subsection: 'intro',
}

export default connect(mapStateToProps)(History)

export const HistorySections = (props) => {
  const { onError, Education } = props

  return (
    <div className="history">
      <Residence
        defaultState={false}
        realtime
        overrideInitial
        onError={onError}
        scrollIntoView={false}
        required
      />

      <Employment
        defaultState={false}
        realtime
        overrideInitial
        onError={onError}
        scrollIntoView={false}
        required
      />

      <Branch
        name="branch_school"
        {...Education.HasAttended}
        label={i18n.t('history.education.label.attendance')}
        labelSize="h3"
      />
      <Show when={Education.HasAttended.value === 'No'}>
        <Branch
          name="branch_degree10"
          {...Education.HasDegree10}
          label={i18n.t('history.education.label.degree10')}
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
        />
      </Show>

      <hr className="section-divider" />
      <Federal
        defaultState={false}
        onError={onError}
        scrollIntoView={false}
        required
      />
    </div>
  )
}
