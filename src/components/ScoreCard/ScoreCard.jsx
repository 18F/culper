import React from 'react'
import PropTypes from 'prop-types'
import { i18n } from '../../config'

class ScoreCard extends React.Component {
  render() {
    const { completedSectionsTotal, totalSections } = this.props
    const classNames = [
      'score-card',
      completedSectionsTotal >= totalSections ? 'completed' : ''
    ].join(' ').trim()
    return (
      <div
        className={classNames}>
        <span className="score-card-done">{completedSectionsTotal}</span>/
        <span className="score-card-total">{totalSections}</span>
        <span className="score-card-text">{i18n.t('scorecard.complete')}</span>
      </div>
    )
  }
}

ScoreCard.propTypes = {
  completedSectionsTotal: PropTypes.number.isRequired,
  totalSections: PropTypes.number.isRequired
}

export default ScoreCard
