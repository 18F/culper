import React from 'react'
import { connect } from 'react-redux'
import {
  sectionsTotal,
  sectionsCompleted
} from '../Navigation/navigation-helpers'

class ProgressBar extends React.Component {
  render() {
    const styles = {
      width:
        '' +
        (sectionsCompleted(this.props.completed, this.props) /
          sectionsTotal()) *
          100 +
        '%'
    }

    return (
      <div className="eapp-progress">
        <div
          id="progress-bar"
          className="eapp-progress-current"
          style={styles}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  let section = state.section || {}
  let app = state.application || {}
  let completed = app.Completed || {}
  return {
    application: app,
    section: section,
    completed: completed
  }
}

export default connect(mapStateToProps)(ProgressBar)
