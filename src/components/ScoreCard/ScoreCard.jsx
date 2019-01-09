import React from 'react'
import PropTypes from 'prop-types'
import { i18n } from '../../config'

class ScoreCard extends React.Component {
  render() {
    const { completedSectionsCount, totalSectionsCount } = this.props
    const classNames = [
      'score-card',
      completedSectionsCount >= totalSectionsCount ? 'completed' : ''
    ].join(' ').trim()
    return (
      <div
        className={classNames}>
        <span className="score-card-done">{completedSectionsCount}</span>/
        <span className="score-card-total">{totalSectionsCount}</span>
        <span className="score-card-text">{i18n.t('scorecard.complete')}</span>
      </div>
    )
  }
}

ScoreCard.propTypes = {
  completedSectionsCount: PropTypes.number.isRequired,
  totalSectionsCount: PropTypes.number.isRequired
}

export default ScoreCard
