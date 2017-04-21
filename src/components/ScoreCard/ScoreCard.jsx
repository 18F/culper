import React from 'react'
import { connect } from 'react-redux'
import { i18n, navigation } from '../../config'
import AuthenticatedView from '../../views/AuthenticatedView'

class ScoreCard extends React.Component {
  sections () {
    return navigation.filter(x => !x.hidden)
  }

  total () {
    return this.sections().length
  }

  completed () {
    const sections = this.sections()
    let completedSections = []

    for (let section in this.props.completed) {
      if (this.props.completed[section].status === 'complete'
          && !completedSections.includes(section)
          && sections.includes(section)) {
        completedSections.push(section)
      }
    }

    return completedSections.length
  }

  render () {
    const completed = this.completed()
    const total = this.total()

    return (
      <div className={`score-card ${completed >= total ? 'completed' : ''}`.trim()}>
        <span className="score-card-done">{completed}</span>
        /
        <span className="score-card-total">{total}</span>
        <span className="score-card-text">{i18n.t('scorecard.complete')}</span>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let completed = app.Completed || {}
  return {
    section: section,
    completed: completed
  }
}

export default connect(mapStateToProps)(AuthenticatedView(ScoreCard))
