import React from 'react'

import { i18n } from '@config'

import { Show } from '@components/Form'

import connectHistorySection from './HistoryConnector'
import { HISTORY, HISTORY_REVIEW } from '@config/formSections/history'

import ResidenceSummaryProgress from './Residence/ResidenceSummaryProgress'
import EmploymentSummaryProgress from './Employment/EmploymentSummaryProgress'
import EducationSummaryProgress from './Education/EducationSummaryProgress'
import Residence from './Residence'
import Employment from './Employment'
import EducationWrapper from './Education/EducationWrapper'
import FederalWrapper from './Federal/FederalWrapper'

const sectionConfig = {
  section: HISTORY.name,
  store: HISTORY.store,
  subsection: HISTORY_REVIEW.name,
}

const Review = (props) => {
  const { Birthdate } = props

  const subsectionProps = {
    required: true,
    scrollIntoView: false,
    overrideInitial: true,
  }

  const sectionDivider = (
    <hr className="section-divider" />
  )

  const hasAttendedSchool = props.Education.HasAttended.value === 'Yes'
  const hasDegree = props.Education.HasDegree10.value === 'Yes'

  return (
    <div>
      <ResidenceSummaryProgress
        Residence={props.Residence}
        Birthdate={Birthdate} />

      <EmploymentSummaryProgress
        Employment={props.Employment}
        Birthdate={Birthdate} />
      
      <Show when={hasAttendedSchool || hasDegree}>
        <EducationSummaryProgress
          Education={props.Education}
          Birthdate={Birthdate} />
      </Show>

      <hr className="section-divider" />
      <h1 className="section-header">
        {i18n.t('history.residence.collection.caption')}
      </h1>
      <Residence {...subsectionProps} />

      <hr className="section-divider" />
      <h1 className="section-header">
        {i18n.t('history.employment.default.collection.caption')}
      </h1>
      <Employment {...subsectionProps} realtime={true} />

      <hr className="section-divider" />
      <h1 className="section-header">
        {i18n.t('history.education.collection.caption')}
      </h1>
      <EducationWrapper inReview={true} />

      <hr className="section-divider" />
      <FederalWrapper inReview={true} />
    </div>
  )
}

export default connectHistorySection(Review, sectionConfig)
