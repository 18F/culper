import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'util/i18n'

import { Field, Show } from 'components/Form'
import { sectionHasGaps } from 'components/Section/History/helpers'

import { HISTORY, HISTORY_RESIDENCE } from 'config/formSections/history'
import * as formConfig from 'config/forms'

import ConnectedResidence from './Residence'
import ResidenceSummaryProgress from './ResidenceSummaryProgress'
import connectHistorySection from '../HistoryConnector'

const sectionConfig = {
  section: HISTORY.name,
  subsection: HISTORY_RESIDENCE.name,
}

export const ResidenceWrapper = (props) => {
  const { Residence, Birthdate, formType } = props

  const years = formType
    && formConfig[formType]
    && formConfig[formType].HISTORY_RESIDENCE_YEARS

  const formName = formType

  let residenceItems = []
  if (Residence && Residence.List && Residence.List.items) {
    residenceItems = Residence.List.items
  }

  const residenceHasGaps = sectionHasGaps(residenceItems, years)

  return (
    <div>
      <h1 className="section-header">
        {i18n.t('history.residence.title')}
      </h1>

      <Field
        title={i18n.t('history.residence.info', { years })}
        titleSize="h3"
        optional
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
        Residence={Residence}
        Birthdate={Birthdate}
        years={years}
      />

      <ConnectedResidence
        realtime
        scrollToTop="scrollToHistory"
        totalYears={years}
      />

      <Show when={residenceHasGaps}>
        <div className="not-complete">
          <hr className="section-divider" />

          <Field
            title={i18n.t('history.residence.heading.exiting')}
            titleSize="h4"
            optional
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
  Residence: PropTypes.object,
  Birthdate: PropTypes.any,
  formType: PropTypes.string.isRequired,
}

ResidenceWrapper.defaultProps = {
  Residence: undefined,
  Birthdate: undefined,
}

export default connectHistorySection(ResidenceWrapper, sectionConfig)
