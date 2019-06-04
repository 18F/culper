import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'

import i18n from 'util/i18n'

import { totalSections, completedSections } from 'helpers/navigation'

import styles from './ScoreCard.module.scss'

export const ScoreCard = ({ total, completed }) => {
  const scoreCardClasses = classnames(
    styles.ScoreCard,
    'score-card',
    { [`${styles.completed}`]: completed >= total }
  )

  const textClasses = classnames(
    styles.text,
    'score-card-text',
  )

  return (
    <div className={scoreCardClasses}>
      <span className="score-card-done">{completed}</span>
      /
      <span className="score-card-total">{total}</span>
      <span className={textClasses}>{i18n.t('scorecard.complete')}</span>
    </div>
  )
}

ScoreCard.propTypes = {
  total: PropTypes.number,
  completed: PropTypes.number,
}

ScoreCard.defaultProps = {
  total: 10,
  completed: 0,
}

const mapStateToProps = state => ({
  total: totalSections(state),
  completed: completedSections(state),
})

export default connect(mapStateToProps)(ScoreCard)
