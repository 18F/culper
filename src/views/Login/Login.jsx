import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { i18n, env } from '../../config'
import { api, getQueryValue, deleteCookie } from '../../services'
import { login, handleLoginSuccess } from '../../actions/AuthActions'
import { Consent } from '../../components/Form'

export class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: this.props.authenticated,
      username: this.props.username,
      password: this.props.password,
      showPassword: this.props.showPassword,
      saml: {}
    }

    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.togglePassword = this.togglePassword.bind(this)
    this.login = this.login.bind(this)
  }

  componentWillMount() {
    this.redirect()
    if (env.SamlEnabled()) {
      api.saml().then(response => {
        this.setState({ saml: response.data || {} })
      })
    }
  }

  redirect() {
    // If user is authenticated, redirect to home page
    if (this.props.authenticated) {
      this.props.history.push('/loading')
      return
    }

    // transfer the token from the cookie to the window - SAML only
    const token = Cookies.get('token')
    if (token) {
      deleteCookie('token')
      api.setToken(token)
      this.props.dispatch(handleLoginSuccess())
      this.props.history.push('/loading')
      return
    }

    const err = getQueryValue(window.location.search, 'error')
    if (err) {
      switch (err) {
        case 'token':
          this.props.history.push('/token')
          return
        case 'access_denied':
          this.props.history.push('/accessdenied')
          return
        case 'saml_logout_failed':
          this.props.history.push('/error')
          break
        default:
          this.props.history.push('/error')
          break
      }
    }
  }

  onUsernameChange(e) {
    if (env.BasicAuthenticationEnabled()) {
      this.setState({ username: e.target.value })
    }
  }

  onPasswordChange(e) {
    if (env.BasicAuthenticationEnabled()) {
      this.setState({ password: e.target.value })
    }
  }

  togglePassword() {
    if (env.BasicAuthenticationEnabled()) {
      this.setState({ showPassword: !this.state.showPassword })
    }
  }

  login(event) {
    event.preventDefault()
    if (env.BasicAuthenticationEnabled()) {
      this.props.dispatch(login(this.state.username, this.state.password))
    }
  }

  errorMessage() {
    if (!this.props.error) {
      return ''
    }

    const msg =
      this.props.error.indexOf('pg: ') === -1
        ? this.props.error
        : i18n.m('login.error.generic')

    return (
      <div className="field no-margin-bottom">
        <div className="table">
          <div className="usa-alert usa-alert-error" role="alert">
            <div className="usa-alert-body">
              <h5 className="usa-alert-heading">{i18n.t('login.error.title')}</h5>
              <p>{msg}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  authSAML() {
    if (!env.SamlEnabled()) {
      return null
    }

    return (
      <div id="saml" className="auth saml">
        <form method="post" action={this.state.saml.URL}>
          <input
            type="hidden"
            name="SAMLRequest"
            value={this.state.saml.Base64XML}
          />
          <button type="submit" className="usa-button-big">
            <span>{i18n.t('login.saml.button')}</span>
          </button>
        </form>
      </div>
    )
  }

  authBasic() {
    if (!env.BasicAuthenticationEnabled()) {
      return null
    }

    const authValid = this.props.error === undefined || this.props.error === ''
    let pwClass = 'password help'
    if (!authValid) {
      pwClass += ' usa-input-error'
    }

    return (
      <div id="basic" className="auth basic">
        <form onSubmit={this.login}>
          <div>
            <label htmlFor="user">{i18n.t('login.basic.username.label')}</label>
            <input
              id="user"
              name="user"
              type="text"
              value={this.state.username}
              onChange={this.onUsernameChange}
            />
          </div>
          <div className={pwClass}>
            <label htmlFor="password">
              {i18n.t('login.basic.password.label')}
            </label>
            <input
              id="password"
              name="password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
            <div className="peek">
              <a
                id="show-password"
                onClick={this.togglePassword}
                href="javascript:;;"
                title={i18n.t(
                  `login.basic.${
                    this.state.showPassword ? 'hide' : 'show'
                  }.title`
                )}>
                {i18n.t(
                  `login.basic.${
                    this.state.showPassword ? 'hide' : 'show'
                  }.text`
                )}
              </a>
            </div>
            {this.errorMessage()}
          </div>
          <div>
            <button type="submit" className="usa-button-big">
              {i18n.t('login.basic.button')}
            </button>
            <a
              id="forgot-password"
              href="javascript:;;"
              title={i18n.t('login.basic.forgot.title')}>
              {i18n.t('login.basic.forgot.text')}
            </a>
          </div>
        </form>
      </div>
    )
  }

  loginFormClass(auths) {
    let count = 0
    for (const auth of auths) {
      if (auth) {
        count++
      }
    }

    switch (count) {
      case 3:
        return 'table three'
      case 2:
        return 'table two'
      case 1:
        return 'table one'
      default:
        return 'table zero'
    }
  }

  loginForm() {
    const saml = this.authSAML()
    const basic = this.authBasic()

    return (
      <div className={this.loginFormClass([saml, basic])}>
        {saml}
        {basic}
      </div>
    )
  }

  render() {
    const modalOpen = document.body.classList.contains('modal-open')
    return (
      <div className="login eapp-core" id="login">
        <Consent dispatch={this.props.dispatch} />
        <div
          id="seal-header"
          className="seal-header text-center"
          aria-hidden={modalOpen}
          aria-disabled={modalOpen}>
          <div className="content">
            <img
              src="/img/nbis-seal.png"
              alt="National Background Investigation Services"
            />
            <h2>{i18n.t('login.title')}</h2>
          </div>
        </div>
        <div
          className="content"
          aria-hidden={modalOpen}
          aria-disabled={modalOpen}>
          {!this.props.authenticated && this.loginForm()}
        </div>
      </div>
    )
  }
}

Login.defaultProps = {
  authenticated: false,
  username: '',
  password: '',
  showPassword: false
}

/**
 * Maps the relevant subtree state from the applications state tree.
 * In this case, we pull the authentication sub-state. This is mapped
 * to the authentication reducer. When actions are dispatched, this
 * method is executed which causes a re-render.
 */
function mapStateToProps(state) {
  const auth = state.authentication
  return {
    authenticated: auth.authenticated,
    token: auth.token,
    error: auth.error
  }
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default withRouter(connect(mapStateToProps)(Login))
