import React from 'react'

import { i18n } from '@config'

import SummaryProgress from '@components/Section/History/SummaryProgress'
import { totalYears, excludeGaps } from '@components/Section/History/helpers'

import { Svg } from '@components/Form'
import { ResidenceValidator } from '@validators'

const dateRangeList = (items) => {
  const dates = []

  for (const i of excludeGaps(items)) {
    if (!i.Item) { continue }

    if (new ResidenceValidator(i.Item).isValid()) {
      dates.push(i.Item.Dates)
    }
  }

  return dates
}

const ResidenceSummaryProgress = (props) => {
  const { Residence, Birthdate } = props

  let residenceDates = []
  if (Residence && Residence.List && Residence.List.items) {
    residenceDates = Residence.List.items
  }

  return (
    <SummaryProgress
      className="residence"
      List={dateRangeList.bind(this, residenceDates)}
      title={i18n.t('history.residence.summary.title')}
      unit={i18n.t('history.residence.summary.unit')}
      total={totalYears(Birthdate)}>
        <div className="summary-icon">
          <Svg
            src="/img/residence-house.svg"
            alt={i18n.t('history.residence.summary.svgAlt')} />
        </div>
      </SummaryProgress>
  )
}

export default ResidenceSummaryProgress
