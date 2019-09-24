import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'util/i18n'

import SummaryProgress from 'components/Section/History/SummaryProgress'
import { Svg } from 'components/Form'

const EmploymentSummaryProgress = (props) => {
  const { dates, years } = props

  return (
    <SummaryProgress
      className="residence"
      List={() => dates}
      title={i18n.t('history.employment.summary.title')}
      unit={i18n.t('history.employment.summary.unit')}
      total={years}
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

EmploymentSummaryProgress.propTypes = {
  years: PropTypes.number,
  dates: PropTypes.array,
}

EmploymentSummaryProgress.defaultProps = {
  years: 10,
  dates: [],
}

export default EmploymentSummaryProgress
