import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'

class ScoreCard extends React.Component {
  render () {
    return (
      <div className="score-card">
        <span className="score-card-done">2</span>
        /
        <span className="score-card-total">29</span>
        <span className="score-card-text">Sections complete</span>
      </div>
    )
  }
}

export default AuthenticatedView(ScoreCard)
