import React from 'react'
import PropTypes from 'prop-types'

import { i18n } from 'config'

import SummaryProgress from 'components/Section/History/SummaryProgress'
import { totalYears } from 'components/Section/History/helpers'

import { Svg } from 'components/Form'
import { EmploymentValidator } from 'validators'

const dateRangeList = (items) => {
  const dates = []

  items.forEach((i) => {
    if (!i.Item) { return }

    if (new EmploymentValidator(i.Item).isValid() === true) {
      dates.push(i.Item.Dates)
    }
  })

  return dates
}

const EmploymentSummaryProgress = (props) => {
  const { Employment, Birthdate, years } = props

  let employmentDates = []
  if (Employment && Employment.List && Employment.List.items) {
    employmentDates = Employment.List.items
  }

  const getEmploymentDates = () => dateRangeList(employmentDates)

  return (
    <SummaryProgress
      className="residence"
      List={getEmploymentDates}
      title={i18n.t('history.employment.summary.title')}
      unit={i18n.t('history.employment.summary.unit')}
      total={totalYears(Birthdate, years)}
    >
      <div className="summary-icon">
        <Svg
          src="/img/employer-briefcase.svg"
          alt={i18n.t('history.employment.summary.svgAlt')}
        />
      </div>
    </SummaryProgress>
  )
}

/* eslint react/forbid-prop-types: 0 */
EmploymentSummaryProgress.propTypes = {
  Employment: PropTypes.object,
  Birthdate: PropTypes.any,
  years: PropTypes.number,
}

EmploymentSummaryProgress.defaultProps = {
  Employment: undefined,
  Birthdate: undefined,
  years: 10,
}

export default EmploymentSummaryProgress
