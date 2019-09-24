import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Svg } from 'components/Form'
import i18n from 'util/i18n'

const SummaryCounter = (props) => {
  const {
    title, className, schoolCount, diplomaCount, schoolsLabel, diplomasLabel,
  } = props

  const classes = classnames('summary-counter', className)

  return (
    <div className={classes}>
      <div className="summary-counter-title">
        <Svg
          src="/img/school-cap.svg"
          alt={i18n.t('history.education.summary.svgAlt')}
        />
        <span className="title">{title}</span>
      </div>
      <div className="summary-counter-schools">
        <span className="schools total">{schoolCount}</span>
        <span className="schools unit">{schoolsLabel}</span>
      </div>
      <div className="summary-counter-diplomas">
        <span className="diplomas total">{diplomaCount}</span>
        <span className="diplomas unit">{diplomasLabel}</span>
      </div>
    </div>
  )
}

SummaryCounter.propTypes = {
  title: PropTypes.node,
  className: PropTypes.string,
  schoolCount: PropTypes.number,
  diplomaCount: PropTypes.number,
  schoolsLabel: PropTypes.node,
  diplomasLabel: PropTypes.node,
}

SummaryCounter.defaultProps = {
  title: i18n.t('history.education.summary.title'),
  className: '',
  schoolCount: 0,
  diplomaCount: 0,
  schoolsLabel: i18n.t('history.education.summary.schools'),
  diplomasLabel: i18n.t('history.education.summary.diplomas'),
}

export default SummaryCounter
