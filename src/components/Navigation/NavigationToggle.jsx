import React from 'react'
import { connect } from 'react-redux'
import { updateApplication } from '../../actions/ApplicationActions'
import AuthenticatedView from '../../views/AuthenticatedView'

export class NavigationToggle extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.props.dispatch(updateApplication('Settings', 'mobileNavigation', !this.isOpen()))
  }

  isOpen () {
    return this.props.settings.mobileNavigation || false
  }

  render () {
    const open = this.isOpen()
    const title = open ? 'Close navigation' : 'Open navigation'
    const icon = `fa ${open ? 'fa-times' : 'fa-bars'}`
    return (
      <a href="javascript:;;"
         className="navigation-toggle mobile-visible"
         title={title}
         aria-label={title}
         onClick={this.toggle}>
        <i className={icon}
           aria-hidden="true"></i>
      </a>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let settings = app.Settings || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    application: app,
    settings: settings,
    section: section,
    errors: errors,
    completed: completed
  }
}

export default connect(mapStateToProps)(AuthenticatedView(NavigationToggle))
