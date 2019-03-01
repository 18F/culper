import React from 'react'
import PropTypes from 'prop-types'

import { i18n } from 'config'
import { HISTORY, HISTORY_EMPLOYMENT } from 'config/formSections/history'

import { Field, Show } from 'components/Form'
import { sectionHasGaps } from 'components/Section/History/helpers'

import ConnectedEmployment from './Employment'
import EmploymentSummaryProgress from './EmploymentSummaryProgress'

import connectHistorySection from '../HistoryConnector'

const sectionConfig = {
  section: HISTORY.name,
  subsection: HISTORY_EMPLOYMENT.name,
}

const EmploymentWrapper = (props) => {
  const { Employment, Birthdate } = props

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
        optional
        className="no-margin-bottom"
      >
        {i18n.m('history.employment.para.employment')}
        {i18n.m('history.employment.para.employment2')}
      </Field>

      <span id="scrollToHistory" />

      <EmploymentSummaryProgress
        Employment={Employment}
        Birthdate={Birthdate}
      />

      <ConnectedEmployment
        scrollToTop="scrollToHistory"
      />

      <Show when={employmentHasGaps}>
        <div className="not-complete">
          <hr className="section-divider" />

          <Field
            title={i18n.t('history.employment.heading.exiting')}
            titleSize="h4"
            optional
            className="no-margin-bottom"
          >
            {i18n.m('history.employment.para.exiting')}
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
}

EmploymentWrapper.defaultProps = {
  Employment: undefined,
  Birthdate: undefined,
}

export default connectHistorySection(EmploymentWrapper, sectionConfig)
