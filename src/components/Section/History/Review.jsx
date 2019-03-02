import React from 'react'

import { i18n } from 'config'
import { HISTORY, HISTORY_REVIEW } from 'config/formSections/history'

import { Show } from 'components/Form'

import connectHistorySection from './HistoryConnector'

import ResidenceSummaryProgress from './Residence/ResidenceSummaryProgress'
import EmploymentSummaryProgress from './Employment/EmploymentSummaryProgress'
import EducationSummaryProgress from './Education/EducationSummaryProgress'
import ConnectedResidence from './Residence'
import ConnectedEmployment from './Employment'
import EducationWrapper from './Education/EducationWrapper'
import FederalWrapper from './Federal/FederalWrapper'

const sectionConfig = {
  section: HISTORY.name,
  store: HISTORY.store,
  subsection: HISTORY_REVIEW.name,
}

const Review = (props) => {
  const {
    Birthdate, Education, Residence, Employment,
  } = props

  const subsectionProps = {
    required: true,
    scrollIntoView: false,
    overrideInitial: true,
  }

  const hasAttendedSchool = Education.HasAttended.value === 'Yes'
  const hasDegree = Education.HasDegree10.value === 'Yes'

  return (
    <div>
      <ResidenceSummaryProgress
        Residence={Residence}
        Birthdate={Birthdate}
      />

      <EmploymentSummaryProgress
        Employment={Employment}
        Birthdate={Birthdate}
      />

      <Show when={hasAttendedSchool || hasDegree}>
        <EducationSummaryProgress
          Education={Education}
          Birthdate={Birthdate}
        />
      </Show>

      <hr className="section-divider" />
      <h1 className="section-header">
        {i18n.t('history.residence.collection.caption')}
      </h1>
      <ConnectedResidence {...subsectionProps} realtime />

      <hr className="section-divider" />
      <h1 className="section-header">
        {i18n.t('history.employment.default.collection.caption')}
      </h1>
      <ConnectedEmployment {...subsectionProps} realtime />

      <hr className="section-divider" />
      <h1 className="section-header">
        {i18n.t('history.education.collection.caption')}
      </h1>
      <EducationWrapper inReview />

      <hr className="section-divider" />
      <FederalWrapper inReview />
    </div>
  )
}

export default connectHistorySection(Review, sectionConfig)
