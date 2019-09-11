import React from 'react'
import PropTypes from 'prop-types'

import { i18n } from 'config'

import SummaryProgress from 'components/Section/History/SummaryProgress'
import { Svg } from 'components/Form'

const ResidenceSummaryProgress = (props) => {
  const { years, dates } = props

  return (
    <SummaryProgress
      className="residence"
      List={() => dates}
      title={i18n.t('history.residence.summary.title')}
      unit={i18n.t('history.residence.summary.unit')}
      total={years}
      dates={dates}
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
  years: PropTypes.number,
  dates: PropTypes.array,
}

ResidenceSummaryProgress.defaultProps = {
  years: 10,
  dates: [],
}

export default ResidenceSummaryProgress
