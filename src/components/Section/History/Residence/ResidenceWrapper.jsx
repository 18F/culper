import React from 'react'

import { i18n } from '@config'

import { Field, Show } from '@components/Form'

import Residence from './Residence'
import ResidenceSummaryProgress from './ResidenceSummaryProgress'

import { today, daysAgo, gaps } from '@components/Section/History/dateranges'
import { totalYears } from '@components/Section/History/History'

import connectHistorySection from '../HistoryConnector'
import { HISTORY, HISTORY_RESIDENCE } from '@config/formSections/history'

const sectionConfig = {
  section: HISTORY.name,
  subsection: HISTORY_RESIDENCE.name,
}

// TODO totalYears has to change based on formType

// TODO - move this to a helper file
const sectionHasGaps = (items = []) => {
  if (!items || !items.length) return true

  const ranges = items
    .filter(i => i.Item && i.Item.Dates)
    .map(i => i.Item.Dates)

  if (!ranges.length) return true

  const start = daysAgo(today, 365 * totalYears())
  const holes = gaps(ranges, start).length

  return holes > 0
}

class ResidenceWrapper extends React.Component {
  render () {
    const { Birthdate } = this.props

    let residenceItems = []
    if (this.props.Residence && this.props.Residence.List && this.props.Residence.List.items) {
      residenceItems = this.props.Residence.List.items
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
          optional={true}
          className="no-margin-bottom">
           {i18n.m('history.residence.info2')}
           {i18n.m('history.residence.info3a')}
           {i18n.m('history.residence.info3b')}
           {i18n.m('history.residence.info3c')}
           {i18n.m('history.residence.info3d')}
        </Field>

        <span id="scrollToHistory" />

        <ResidenceSummaryProgress
          Residence={this.props.Residence}
          Birthdate={Birthdate} />

        <Residence
          scrollToTop="scrollToHistory" />

        <Show when={residenceHasGaps}>
          <div className="not-complete">
            <hr className="section-divider" />

            <Field
              title={i18n.t('history.residence.heading.exiting')}
              titleSize="h4"
              optional={true}
              className="no-margin-bottom">
              {i18n.m('history.residence.para.exiting')}  
            </Field>
          </div>
        </Show>
      </div>
    )
  }
}

ResidenceWrapper.defaultProps = {
  Residence: {},
  Birthdate: {},
}

export default connectHistorySection(ResidenceWrapper, sectionConfig)
