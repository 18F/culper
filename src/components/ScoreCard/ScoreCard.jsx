import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../config'
import AuthenticatedView from '../../views/AuthenticatedView'

const sections = ['identification', 'financial', 'family', 'military', 'history', 'foreign', 'legal']

class ScoreCard extends React.Component {
  total () {
    return sections.length
  }

  completed () {
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
    return (
      <div className="score-card">
        <span className="score-card-done">{this.completed()}</span>
        /
        <span className="score-card-total">{this.total()}</span>
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
