import React from 'react'

import { i18n } from '@config'

import SummaryCounter from '@components/Section/History/SummaryCounter'
import SummaryProgress from '@components/Section/History/SummaryProgress'
import { totalYears } from '@components/Section/History/History'

import { Svg } from '@components/Form'
import { EducationItemValidator } from '@validators'

const excludeGaps = (items) => {
  return items.filter(
    item => !item.type || (item.type && item.type !== 'Gap')
  )
}

const schoolRangesList = (items) => {
  const dates = []

  for (const i of items) {
    if (!i.Item || !i.Item.Dates || !i.Item.Dates.to || !i.Item.Dates.from) {
      continue
    }

    if (new EducationItemValidator(i.Item).isValid()) {
      dates.push(i.Item.Dates)
    }
  }

  return dates
}

const diplomasRangesList = (items) => {
  const dates = []

  for (const i of items) {
    if (!i.Item) { continue }

    if (!new EducationItemValidator(i.Item).isValid()) {
      continue
    }

    if (i.Item.Diplomas.items) {
      for (const d of i.Item.Diplomas.items) {
        if (!d.Item || !d.Item.Date) {
          continue
        }

        dates.push(d.Item.Date)
      }
    }
  }

  return dates
}

const EducationSummaryProgress = (props) => {
  const { Education, Birthdate } = props

  let schoolDates = []
  if (Education && Education.List && Education.List.items) {
    schoolDates = Education.List.items
  }

  return (
    <SummaryCounter
      className="education"
      title={i18n.t('history.education.summary.title')}
      schools={schoolRangesList.bind(this, schoolDates)}
      diplomas={diplomasRangesList.bind(this, schoolDates)}
      schoolsLabel={i18n.t('history.education.summary.schools')}
      diplomasLabel={i18n.t('history.education.summary.diplomas')}
      total={totalYears(Birthdate)}>
        <div className="summary-icon">
          <Svg
            src="/img/school-cap.svg"
            alt={i18n.t('history.education.summary.svgAlt')} />
        </div>
      </SummaryCounter>
  )
}

export default EducationSummaryProgress
