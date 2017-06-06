import React from 'react'
import { connect } from 'react-redux'
import { navigation } from '../../config'
import AuthenticatedView from '../../views/AuthenticatedView'
import { validations } from '../Navigation'

class ProgressBar extends React.Component {
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
      if (validations(navigation.find(n => n.url === section), this.props) === valid) {
        completed++
      }
    }

    return completed
  }

  render () {
    const styles = {
      width: '' + ((this.completed() / this.total()) * 100) + '%'
    }

    return (
      <div className="eapp-progress">
        <div id="progress-bar" className="eapp-progress-current" style={styles}></div>
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

export default connect(mapStateToProps)(AuthenticatedView(ProgressBar))
