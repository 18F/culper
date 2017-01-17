import React from 'react'
import { Link } from 'react-router'
import { i18n } from '../../config'
import { GithubOAuth } from '../../services'

export default class LoginOAuth extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: GithubOAuth.authenticated()
    }
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
  }

  logout () {
    GithubOAuth.logout()
    this.setState({ authenticated: GithubOAuth.authenticated() })
    window.location.reload()
  }

  login () {
    this.setState({ authenticated: GithubOAuth.authenticated() })
    window.location.href = GithubOAuth.url
  }

  render () {
    if (this.state.authenticated) {
      return (
        <button type="button" onClick={this.logout}>{i18n.t('app.logout')}</button>
      )
    } else {
      return (
        <button type="button" onClick={this.login}>{this.props.children}</button>
      )
    }
  }
}
