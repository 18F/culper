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
    let completed = 0

    for (const section in this.props.completed) {
      const valid = this.props.completed[section]
            .filter(e => e.section.toLowerCase() === section.toLowerCase() && e.valid === true)
            .length
      if (this.countValidations(section) === valid) {
        completed++
      }
    }

    return completed
  }

  countValidations (section) {
    return navigation.filter(x => x.url === section).reduce((x, y) => {
      const subs = y.subsections.filter(s => {
        if (s.hidden || (s.hiddenFunc && s.hiddenFunc(this.props.application))) {
          return false
        }

        return true
      })

      return x + subs.length
    }, 0)
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
