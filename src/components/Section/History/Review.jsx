import React from 'react'

import { i18n } from 'config'
import { HISTORY, HISTORY_REVIEW } from 'config/formSections/history'
import * as formConfig from 'config/forms'

import { Show } from 'components/Form'

import connectSubsection from 'components/Section/shared/SubsectionConnector'
import Subsection from 'components/Section/shared/Subsection'


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
    Birthdate, Education, Residence, Employment, formType, requireHistoryFederalSection, forPrint,
  } = props

  const formTypeConfig = formType && formConfig[formType]
  const residenceYears = formTypeConfig && formTypeConfig.HISTORY_RESIDENCE_YEARS
  const employmentYears = formTypeConfig && formTypeConfig.HISTORY_EMPLOYMENT_YEARS
  const employmentRecordYears = formTypeConfig && formTypeConfig.HISTORY_EMPLOYMENT_RECORD_YEARS
  const educationYears = formTypeConfig && formTypeConfig.HISTORY_EDUCATION_YEARS

  const subsectionProps = {
    required: true,
    scrollIntoView: false,
    overrideInitial: true,
  }

  const hasAttendedSchool = Education.HasAttended.value === 'Yes'
  const hasDegree = Education.HasDegree10.value === 'Yes'

  return (
    <div>
      {!forPrint && (
        <span>
          <ResidenceSummaryProgress
            Residence={Residence}
            Birthdate={Birthdate}
            years={residenceYears}
          />

          <EmploymentSummaryProgress
            Employment={Employment}
            Birthdate={Birthdate}
            years={employmentYears}
          />

          <Show when={hasAttendedSchool || hasDegree}>
            <EducationSummaryProgress
              Education={Education}
              Birthdate={Birthdate}
              years={educationYears}
            />
          </Show>
        </span>
      )}

      {!forPrint && <hr className="section-divider" />}

      <h1 className="section-header">
        {i18n.t('history.residence.collection.caption')}
      </h1>
      <ConnectedResidence
        {...subsectionProps}
        totalYears={residenceYears}
        realtime
      />

      <hr className="section-divider" />
      <h1 className="section-header">
        {i18n.t('history.employment.default.collection.caption')}
      </h1>
      <ConnectedEmployment
        {...subsectionProps}
        totalYears={employmentYears}
        recordYears={employmentRecordYears}
        realtime
      />

      <hr className="section-divider" />
      <h1 className="section-header">
        {i18n.t('history.education.collection.caption')}
      </h1>
      <EducationWrapper inReview />

      {requireHistoryFederalSection && <hr className="section-divider" />}
      {requireHistoryFederalSection && <FederalWrapper inReview />}
    </div>
  )
}

export default connectSubsection(Review, sectionConfig)
