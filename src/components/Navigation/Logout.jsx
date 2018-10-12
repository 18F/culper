import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../config'
import { logout } from '../../actions/AuthActions'
import { saveSection } from '../SavedIndicator/persistence-helpers'

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    const application = this.props.app
    const section = this.props.section.section
    const subsection = this.props.section.subsection

    saveSection(application, section, subsection, this.props.dispatch)
      .then(() => {
        this.props.dispatch(logout())
      })
      .catch(error => {
        alert(error)
      })
  }

  render() {
    return (
      <a href="#" onClick={this.logout} className="logout">
        {i18n.t('app.logout')}
      </a>
    )
  }
}

function mapStateToProps(state) {
  const section = state.section || {}
  const app = state.application || {}
  return {
    section: section,
    app: app
  }
}

export default connect(mapStateToProps)(Logout)
