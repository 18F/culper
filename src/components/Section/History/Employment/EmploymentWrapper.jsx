import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'util/i18n'

import { HISTORY, HISTORY_EMPLOYMENT } from 'config/formSections/history'
import * as formConfig from 'config/forms'

import { Field, Show } from 'components/Form'
import { sectionHasGaps } from 'components/Section/History/helpers'

import connectSubsection from 'components/Section/shared/SubsectionConnector'

import ConnectedEmployment from './Employment'
import EmploymentSummaryProgress from './EmploymentSummaryProgress'

const sectionConfig = {
  section: HISTORY.name,
  subsection: HISTORY_EMPLOYMENT.name,
}

const EmploymentWrapper = (props) => {
  const { Employment, Birthdate, formType } = props

  const formTypeConfig = formType && formConfig[formType]

  const years = formTypeConfig && formTypeConfig.HISTORY_EMPLOYMENT_YEARS
  const recordYears = formTypeConfig && formTypeConfig.HISTORY_EMPLOYMENT_RECORD_YEARS

  const formName = formType

  let employmentItems = []
  if (Employment && Employment.List && Employment.List.items) {
    employmentItems = Employment.List.items
  }

  const employmentHasGaps = sectionHasGaps(employmentItems)

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
      />

      <ConnectedEmployment
        scrollToTop="scrollToHistory"
        totalYears={years}
        recordYears={recordYears}
      />

      <Show when={employmentHasGaps}>
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
  Employment: PropTypes.object,
  Birthdate: PropTypes.any,
  formType: PropTypes.string.isRequired,
}

EmploymentWrapper.defaultProps = {
  Employment: undefined,
  Birthdate: undefined,
}

export default connectSubsection(EmploymentWrapper, sectionConfig)
