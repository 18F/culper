import React from 'react'
import PropTypes from 'prop-types'

import { i18n } from 'config'

import SummaryProgress from 'components/Section/History/SummaryProgress'
import { totalYears } from 'components/Section/History/helpers'
import { Svg } from 'components/Form'

const dateRangeList = (items, errors) => {
  const dates = []

  items.forEach((i) => {
    if (!i.Item) return

    const itemErrors = errors && errors.filter(e => e.indexOf(i.uuid) > -1)
    if (itemErrors && itemErrors.length > 0) return

    dates.push(i.Item.Dates)
  })

  return dates
}

const EmploymentSummaryProgress = (props) => {
  const {
    Employment, Birthdate, years, errors,
  } = props

  let employmentDates = []
  if (Employment && Employment.List && Employment.List.items) {
    employmentDates = Employment.List.items
  }

  const getEmploymentDates = () => dateRangeList(employmentDates, errors)

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
  errors: PropTypes.array,
}

EmploymentSummaryProgress.defaultProps = {
  Employment: undefined,
  Birthdate: undefined,
  years: 10,
  errors: [],
}

export default EmploymentSummaryProgress
