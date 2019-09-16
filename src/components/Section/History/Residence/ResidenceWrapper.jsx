import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'util/i18n'

import { Field, Show } from 'components/Form'

import { HISTORY, HISTORY_RESIDENCE } from 'config/formSections/history'
import * as formConfig from 'config/forms'
import { findTimelineGaps, getApplicantRequiredDuration } from 'helpers/date'

import connectSubsection from 'components/Section/shared/SubsectionConnector'

import ConnectedResidence from './Residence'
import ResidenceSummaryProgress from './ResidenceSummaryProgress'

const sectionConfig = {
  key: HISTORY_RESIDENCE.key,
  section: HISTORY.name,
  subsection: HISTORY_RESIDENCE.name,
}

const ResidenceWrapper = (props) => {
  const {
    applicantBirthdate, formType, errors, data,
  } = props

  const years = formType
    && formConfig[formType]
    && formConfig[formType].HISTORY_RESIDENCE_YEARS

  const requiredYears = getApplicantRequiredDuration({ years }, applicantBirthdate)

  const formName = formType

  const validResidenceDates = data.List && data.List.items
    ? data.List.items.filter((i) => {
      if (!i.Item) return false
      if (!errors || !errors.length) return true
      if (errors.filter(e => e.indexOf(i.uuid) > -1).length > 0) return false
      return true
    }).map(i => i.Item.Dates)
    : []

  const gaps = findTimelineGaps({ years: requiredYears }, validResidenceDates)

  return (
    <div>
      <h1 className="section-header">
        {i18n.t('history.residence.title')}
      </h1>

      <Field
        title={i18n.t('history.residence.info', { years })}
        titleSize="h3"
        optional={true}
        className="no-margin-bottom"
      >
        {i18n.m('history.residence.info2')}
        {i18n.m('history.residence.info3a')}
        {i18n.m('history.residence.info3b')}
        {i18n.m('history.residence.info3c')}
        {i18n.m('history.residence.info3d')}
      </Field>

      <span id="scrollToHistory" />

      <ResidenceSummaryProgress
        years={requiredYears}
        dates={validResidenceDates}
      />

      <ConnectedResidence
        realtime={true}
        scrollToTop="scrollToHistory"
        totalYears={requiredYears}
        gaps={gaps}
      />

      <Show when={gaps && gaps.length > 0}>
        <div className="not-complete">
          <hr className="section-divider" />

          <Field
            title={i18n.t('history.residence.heading.exiting')}
            titleSize="h4"
            optional={true}
            className="no-margin-bottom"
          >
            {i18n.m('history.residence.para.exiting', { years, formName })}
          </Field>
        </div>
      </Show>
    </div>
  )
}

/* eslint react/forbid-prop-types: 0 */
ResidenceWrapper.propTypes = {
  applicantBirthdate: PropTypes.object,
  formType: PropTypes.string.isRequired,
  data: PropTypes.object,
  errors: PropTypes.array,
}

ResidenceWrapper.defaultProps = {
  applicantBirthdate: null,
  data: {},
  errors: [],
}

export default connectSubsection(ResidenceWrapper, sectionConfig)
