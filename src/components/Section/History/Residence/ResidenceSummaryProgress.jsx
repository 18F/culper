import React from 'react'
import PropTypes from 'prop-types'

import { i18n } from 'config'

import SummaryProgress from 'components/Section/History/SummaryProgress'
import { totalYears } from 'components/Section/History/helpers'

import { Svg } from 'components/Form'
import { ResidenceValidator } from 'validators'

const dateRangeList = (items) => {
  const dates = []

  items.forEach((i) => {
    if (!i.Item) { return }

    if (new ResidenceValidator(i.Item).isValid() === true) {
      dates.push(i.Item.Dates)
    }
  })

  return dates
}

const ResidenceSummaryProgress = (props) => {
  const { Residence, Birthdate, years } = props

  let residenceDates = []
  if (Residence && Residence.List && Residence.List.items) {
    residenceDates = Residence.List.items
  }

  const getResidenceDates = () => dateRangeList(residenceDates)

  return (
    <SummaryProgress
      className="residence"
      List={getResidenceDates}
      title={i18n.t('history.residence.summary.title')}
      unit={i18n.t('history.residence.summary.unit')}
      total={totalYears(Birthdate, years)}
    >
      <div className="summary-icon">
        <Svg
          src="/img/residence-house.svg"
          alt={i18n.t('history.residence.summary.svgAlt')}
        />
      </div>
    </SummaryProgress>
  )
}

/* eslint react/forbid-prop-types: 0 */
ResidenceSummaryProgress.propTypes = {
  Residence: PropTypes.object,
  Birthdate: PropTypes.any,
  years: PropTypes.number,
}

ResidenceSummaryProgress.defaultProps = {
  Residence: undefined,
  Birthdate: undefined,
  years: 10,
}

export default ResidenceSummaryProgress
