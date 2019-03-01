import React from 'react'
import PropTypes from 'prop-types'

import { i18n } from 'config'
import { HISTORY, HISTORY_RESIDENCE } from 'config/formSections/history'

import { Field, Show } from 'components/Form'
import { sectionHasGaps } from 'components/Section/History/helpers'

import ConnectedResidence from './Residence'
import ResidenceSummaryProgress from './ResidenceSummaryProgress'

import connectHistorySection from '../HistoryConnector'

const sectionConfig = {
  section: HISTORY.name,
  subsection: HISTORY_RESIDENCE.name,
}

const ResidenceWrapper = (props) => {
  const { Residence, Birthdate } = props

  let residenceItems = []
  if (Residence && Residence.List && Residence.List.items) {
    residenceItems = Residence.List.items
  }

  const residenceHasGaps = sectionHasGaps(residenceItems)

  return (
    <div>
      <h1 className="section-header">
        {i18n.t('history.residence.title')}
      </h1>

      <Field
        title={i18n.t('history.residence.info')}
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
      />

      <ConnectedResidence
        realtime
        scrollToTop="scrollToHistory"
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
            {i18n.m('history.residence.para.exiting')}
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
}

ResidenceWrapper.defaultProps = {
  Residence: undefined,
  Birthdate: undefined,
}

export default connectHistorySection(ResidenceWrapper, sectionConfig)
