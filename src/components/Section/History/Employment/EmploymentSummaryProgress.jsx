import React from 'react'

import { i18n } from '@config'

import SummaryProgress from '@components/Section/History/SummaryProgress'
import { totalYears } from '@components/Section/History/History'

import { Svg } from '@components/Form'
import { EmploymentValidator } from '@validators'

const excludeGaps = (items) => {
  return items.filter(
    item => !item.type || (item.type && item.type !== 'Gap')
  )
}

const dateRangeList = (items) => {
  const dates = []

  for (const i of excludeGaps(items)) {
    if (!i.Item) { continue }

    if (new EmploymentValidator(i.Item).isValid()) {
      dates.push(i.Item.Dates)
    }
  }

  return dates
}

const EmploymentSummaryProgress = (props) => {
  const { Employment, Birthdate } = props

  let employmentDates = []
  if (Employment && Employment.List && Employment.List.items) {
    employmentDates = Employment.List.items
  }

  return (
    <SummaryProgress
      className="residence"
      List={dateRangeList.bind(this, employmentDates)}
      title={i18n.t('history.employment.summary.title')}
      unit={i18n.t('history.employment.summary.unit')}
      total={totalYears(Birthdate)}>
        <div className="summary-icon">
          <Svg
            src="/img/employer-briefcase.svg"
            alt={i18n.t('history.employment.summary.svgAlt')} />
        </div>
      </SummaryProgress>
  )
}

export default EmploymentSummaryProgress
