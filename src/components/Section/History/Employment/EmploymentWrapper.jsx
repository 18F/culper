import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'util/i18n'

import { HISTORY, HISTORY_EMPLOYMENT } from 'config/formSections/history'
import * as formConfig from 'config/forms'
import { findTimelineGaps, getApplicantRequiredDuration } from 'helpers/date'

import { Field, Show } from 'components/Form'

import connectSubsection from 'components/Section/shared/SubsectionConnector'

import ConnectedEmployment from './Employment'
import EmploymentSummaryProgress from './EmploymentSummaryProgress'

const sectionConfig = {
  key: HISTORY_EMPLOYMENT.key,
  section: HISTORY.name,
  subsection: HISTORY_EMPLOYMENT.name,
}

const EmploymentWrapper = (props) => {
  const {
    Employment, Birthdate, formType, errors, applicantBirthdate, data,
  } = props

  const formTypeConfig = formType && formConfig[formType]

  const years = formTypeConfig && formTypeConfig.HISTORY_EMPLOYMENT_YEARS
  const recordYears = formTypeConfig && formTypeConfig.HISTORY_EMPLOYMENT_RECORD_YEARS

  const requiredYears = getApplicantRequiredDuration({ years }, applicantBirthdate)

  const formName = formType

  const validEmploymentDates = data.List && data.List.items
    ? data.List.items.filter((i) => {
      if (!i.Item) return false
      if (!errors || !errors.length) return true
      if (errors.filter(e => e.indexOf(i.uuid) > -1).length > 0) return false
      return true
    }).map(i => i.Item.Dates)
    : []

  const gaps = findTimelineGaps({ years: requiredYears }, validEmploymentDates)

  return (
    <div>
      <h1 className="section-header">
        {i18n.t('history.employment.summary.title')}
      </h1>

      <Field
        title={i18n.t('history.employment.heading.employment')}
        titleSize="h3"
        optional={true}
        className="no-margin-bottom"
      >
        {i18n.m('history.employment.para.employment', { years })}
        {i18n.m('history.employment.para.employment2')}
      </Field>

      <span id="scrollToHistory" />

      <EmploymentSummaryProgress
        Employment={Employment}
        Birthdate={Birthdate}
        years={years}
        dates={validEmploymentDates}
        errors={errors}
      />

      <ConnectedEmployment
        scrollToTop="scrollToHistory"
        totalYears={requiredYears}
        recordYears={recordYears}
        gaps={gaps}
      />

      <Show when={gaps && gaps.length > 0}>
        <div className="not-complete">
          <hr className="section-divider" />

          <Field
            title={i18n.t('history.employment.heading.exiting')}
            titleSize="h4"
            optional={true}
            className="no-margin-bottom"
          >
            {i18n.m('history.employment.para.exiting', { years, formName })}
          </Field>
        </div>
      </Show>
    </div>
  )
}

/* eslint react/forbid-prop-types: 0 */
EmploymentWrapper.propTypes = {
  applicantBirthdate: PropTypes.object,
  data: PropTypes.object,
  Employment: PropTypes.object,
  Birthdate: PropTypes.any,
  formType: PropTypes.string.isRequired,
  errors: PropTypes.array,
}

EmploymentWrapper.defaultProps = {
  applicantBirthdate: null,
  data: {},
  Employment: undefined,
  Birthdate: undefined,
  errors: [],
}

export default connectSubsection(EmploymentWrapper, sectionConfig)
