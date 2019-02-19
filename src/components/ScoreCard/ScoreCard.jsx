import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { i18n } from '@config'
import AuthenticatedView from '@views/AuthenticatedView'

import {
  sectionsTotal,
  sectionsCompleted
} from '@components/Navigation/navigation-helpers'

class ScoreCard extends React.Component {
  render() {
    const completed = sectionsCompleted(this.props.completed, this.props)
    const total = sectionsTotal()

    const scoreCardClasses = classnames(
      'score-card',
      { completed: completed >= total }
    )

    return (
      <div
        className={scoreCardClasses}>
        <span className="score-card-done">{completed}</span>/
        <span className="score-card-total">{total}</span>
        <span className="score-card-text">{i18n.t('scorecard.complete')}</span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const section = state.section || {}
  const app = state.application || {}
  const completed = app.Completed || {}
  return {
    application: app,
    section: section,
    completed: completed
  }
}

export default connect(mapStateToProps)(AuthenticatedView(ScoreCard))
