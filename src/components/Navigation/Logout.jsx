import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../config'
import { logout } from '../../actions/AuthActions'

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.dispatch(logout())
  }

  render () {
    return <a href="#" onClick={this.logout} className="logout">{i18n.t('app.logout')}</a>
  }
}

export default connect()(Logout)
