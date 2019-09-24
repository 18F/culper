import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'util/i18n'
import {
  HISTORY,
  HISTORY_RESIDENCE,
  HISTORY_EMPLOYMENT,
  HISTORY_EDUCATION,
  HISTORY_REVIEW,
} from 'config/formSections/history'
import * as formConfig from 'config/forms'
import { findTimelineGaps, getApplicantRequiredDuration } from 'helpers/date'

import { Show } from 'components/Form'

import connectSubsection from 'components/Section/shared/SubsectionConnector'

import ResidenceSummaryProgress from './Residence/ResidenceSummaryProgress'
import EmploymentSummaryProgress from './Employment/EmploymentSummaryProgress'
import EducationSummaryProgress from './Education/EducationSummaryProgress'
import ConnectedResidence from './Residence'
import ConnectedEmployment from './Employment'
import EducationWrapper from './Education/EducationWrapper'
import FederalWrapper from './Federal/FederalWrapper'

const sectionConfig = {
  key: HISTORY_REVIEW.key,
  section: HISTORY.name,
  store: HISTORY.store,
  subsection: HISTORY_REVIEW.name,
}

const Review = (props) => {
  const {
    applicantBirthdate, Education, Residence, Employment, formType, requireHistoryFederalSection,
    forPrint,
    errors,
  } = props

  const formTypeConfig = formType && formConfig[formType]
  const residenceYears = formTypeConfig && formTypeConfig.HISTORY_RESIDENCE_YEARS
  const employmentYears = formTypeConfig && formTypeConfig.HISTORY_EMPLOYMENT_YEARS
  const employmentRecordYears = formTypeConfig && formTypeConfig.HISTORY_EMPLOYMENT_RECORD_YEARS

  const residenceErrors = errors && errors[HISTORY_RESIDENCE.key]
  const employmentErrors = errors && errors[HISTORY_EMPLOYMENT.key]

  const subsectionProps = {
    required: true,
    scrollIntoView: false,
    overrideInitial: true,
  }

  const hasAttendedSchool = Education.HasAttended.value === 'Yes'
  const hasDegree = Education.HasDegree10.value === 'Yes'

  const requiredResidenceYears = getApplicantRequiredDuration({
    years: residenceYears,
  }, applicantBirthdate)

  const requiredEmploymentYears = getApplicantRequiredDuration({
    years: employmentYears,
  }, applicantBirthdate)

  const validResidenceDates = Residence.List && Residence.List.items
    ? Residence.List.items.filter((i) => {
      if (!i.Item) return false
      if (!residenceErrors || !residenceErrors.length) return true
      if (residenceErrors.filter(e => e.indexOf(i.uuid) > -1).length > 0) return false
      return true
    }).map(i => i.Item.Dates)
    : []

  const residenceGaps = findTimelineGaps({ years: requiredResidenceYears }, validResidenceDates)

  const validEmploymentDates = Employment.List && Employment.List.items
    ? Employment.List.items.filter((i) => {
      if (!i.Item) return false
      if (!employmentErrors || !employmentErrors.length) return true
      if (employmentErrors.filter(e => e.indexOf(i.uuid) > -1).length > 0) return false
      return true
    }).map(i => i.Item.Dates)
    : []

  const employmentGaps = findTimelineGaps({ years: requiredEmploymentYears }, validEmploymentDates)

  return (
    <div>
      {!forPrint && (
        <span>
          <ResidenceSummaryProgress
            years={requiredResidenceYears}
            dates={validResidenceDates}
          />

          <EmploymentSummaryProgress
            years={requiredEmploymentYears}
            dates={validEmploymentDates}
          />

          <Show when={hasAttendedSchool || hasDegree}>
            <EducationSummaryProgress
              items={Education && Education.List && Education.List.items}
              errors={errors && errors[HISTORY_EDUCATION.key]}
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
        totalYears={requiredResidenceYears}
        realtime={true}
        gaps={residenceGaps}
      />

      <hr className="section-divider" />
      <h1 className="section-header">
        {i18n.t('history.employment.default.collection.caption')}
      </h1>
      <ConnectedEmployment
        {...subsectionProps}
        totalYears={requiredEmploymentYears}
        recordYears={employmentRecordYears}
        realtime={true}
        gaps={employmentGaps}
      />

      <hr className="section-divider" />
      <h1 className="section-header">
        {i18n.t('history.education.collection.caption')}
      </h1>
      <EducationWrapper inReview={true} />

      {requireHistoryFederalSection && <hr className="section-divider" />}
      {requireHistoryFederalSection && <FederalWrapper inReview={true} />}
    </div>
  )
}

Review.propTypes = {
  applicantBirthdate: PropTypes.object,
  Education: PropTypes.object,
  Residence: PropTypes.object,
  Employment: PropTypes.object,
  formType: PropTypes.string,
  requireHistoryFederalSection: PropTypes.bool,
  forPrint: PropTypes.bool,
  errors: PropTypes.object,
}

Review.defaultProps = {
  applicantBirthdate: null,
  Education: { HasAttended: '', HasDegree10: '', List: { items: [] } },
  Residence: { List: { items: [] } },
  Employment: { List: { items: [] } },
  formType: null,
  requireHistoryFederalSection: true,
  forPrint: false,
  errors: {},
}

export default connectSubsection(Review, sectionConfig)
