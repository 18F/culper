import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'

class ScoreCard extends React.Component {
  render () {
    return (
      <div className="score-card"></div>
    )
  }
}

export default AuthenticatedView(ScoreCard)
