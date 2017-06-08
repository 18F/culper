import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../config'
import { updateApplication } from '../../actions/ApplicationActions'
import { logout } from '../../actions/AuthActions'
import AuthenticatedView from '../../views/AuthenticatedView'

class NavigationToggle extends React.Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  logout () {
    this.props.dispatch(logout())
    window.location = window.location.pathname
  }

  toggle () {
    const open = this.props.settings.mobileNavigation || false
    this.props.dispatch(updateApplication('Settings', 'mobileNavigation', !open))
  }

  render () {
    if (this.props.settings.mobileNavigation) {
      return (
        <div className="navigation-override mobile-visible">
          <a href="javascript:;;" className="logout" onClick={this.logout}>
            <span>{i18n.t('app.logout')}</span>
          </a>
          <a href="javascript:;;" className="navigation-toggle" onClick={this.toggle}>
            <i className="fa fa-times" aria-hidden="true"></i>
            <span>Close navigation</span>
          </a>
        </div>
      )
    }

    return (
      <a href="javascript:;;" className="navigation-toggle mobile-visible" onClick={this.toggle}>
        <i className="fa fa-bars" aria-hidden="true"></i>
        <span>Navigation</span>
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
