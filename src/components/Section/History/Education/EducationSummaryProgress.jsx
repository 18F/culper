import React from 'react'
import PropTypes from 'prop-types'

import { i18n } from 'config'

import SummaryCounter from 'components/Section/History/SummaryCounter'
import { totalYears } from 'components/Section/History/helpers'

const schoolRangesList = (items, errors) => {
  const dates = []

  items.forEach((i) => {
    if (!i.Item || !i.Item.Dates || !i.Item.Dates.to || !i.Item.Dates.from) {
      return
    }

    const itemErrors = errors && errors.filter(e => e.indexOf(i.uuid) > -1)
    if (itemErrors && itemErrors.length > 0) return

    dates.push(i.Item.Dates)
  })

  return dates
}

const diplomasRangesList = (items, errors) => {
  const dates = []

  items.forEach((i) => {
    if (!i.Item) return

    const itemErrors = errors && errors.filter(e => e.indexOf(i.uuid) > -1)
    if (itemErrors && itemErrors.length > 0) return

    if (i.Item.Diplomas.items) {
      i.Item.Diplomas.items.forEach((d) => {
        if (!d.Item || !d.Item.Date) { return }

        dates.push(d.Item.Date)
      })
    }
  })

  return dates
}

const EducationSummaryProgress = (props) => {
  const {
    Education, Birthdate, years, errors,
  } = props

  let schoolDates = []
  if (Education && Education.List && Education.List.items) {
    schoolDates = Education.List.items
  }

  const getSchoolDates = () => schoolRangesList(schoolDates, errors)
  const getDiplomaDates = () => diplomasRangesList(schoolDates, errors)

  return (
    <SummaryCounter
      className="education"
      title={i18n.t('history.education.summary.title')}
      schools={getSchoolDates}
      diplomas={getDiplomaDates}
      schoolsLabel={i18n.t('history.education.summary.schools')}
      diplomasLabel={i18n.t('history.education.summary.diplomas')}
      total={totalYears(Birthdate, years)}
    />
  )
}

/* eslint react/forbid-prop-types: 0 */
EducationSummaryProgress.propTypes = {
  Education: PropTypes.object,
  Birthdate: PropTypes.any,
  years: PropTypes.number,
  errors: PropTypes.array,
}

EducationSummaryProgress.defaultProps = {
  Education: null,
  Birthdate: null,
  years: 10,
  errors: [],
}

export default EducationSummaryProgress
