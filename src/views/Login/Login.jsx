import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import i18n from 'util/i18n'
import { env } from 'config'
import { api, getQueryValue, deleteCookie } from 'services'
import { login, handleLoginSuccess } from 'actions/AuthActions'
import * as errorCodes from 'constants/errorCodes'
import { Consent } from 'components/Form'

export class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      showPassword: false,
      saml: {},
    }
  }

  componentWillMount() {
    this.redirect()

    if (env.SamlEnabled()) {
      api.saml().then((response) => {
        this.setState({ saml: response.data || {} })
      })
    }
  }

  onUsernameChange = (e) => {
    if (env.BasicAuthenticationEnabled()) {
      this.setState({ username: e.target.value })
    }
  }

  onPasswordChange = (e) => {
    if (env.BasicAuthenticationEnabled()) {
      this.setState({ password: e.target.value })
    }
  }

  togglePassword = () => {
    if (env.BasicAuthenticationEnabled()) {
      this.setState(prev => ({
        showPassword: !prev.showPassword,
      }))
    }
  }

  login = (event) => {
    const { dispatch } = this.props
    const { username, password } = this.state

    event.preventDefault()

    if (env.BasicAuthenticationEnabled()) {
      dispatch(login(username, password))
    }
  }

  redirect() {
    const { authenticated, history, dispatch } = this.props

    // If user is authenticated, redirect to home page
    if (authenticated) {
      history.push('/loading')
      return
    }

    // transfer the token from the cookie to the window - SAML only
    const token = Cookies.get('token')
    if (token) {
      deleteCookie('token')
      api.setToken(token)
      dispatch(handleLoginSuccess())
      history.push('/loading')
      return
    }

    const err = getQueryValue(window.location.search, 'error')
    if (err) {
      switch (err) {
        case 'token':
          history.push('/token')
          return
        case 'access_denied':
          history.push('/accessdenied')
          return
        case 'saml_logout_failed':
          history.push('/error')
          break
        default:
          history.push('/error')
          break
      }
    }
  }

  errorMessage() {
    const { errors } = this.props

    if (!errors || errors.length < 0) {
      return null
    }

    // Only show first error for now? UI TBD if multiple
    const [error] = errors
    const { message, code } = error

    let errorMessage
    switch (code) {
      case errorCodes.USERNAME_MISSING:
      case errorCodes.PASSWORD_MISSING:
        errorMessage = i18n.t('login.error.generic')
        break
      case errorCodes.NETWORK_ERROR:
        errorMessage = i18n.t('login.error.network')
        break
      case errorCodes.UNKNOWN_ERROR:
        errorMessage = i18n.t('login.error.network', { code })
        break
      default:
        errorMessage = message // default to message sent by API
    }

    return (
      <div className="field no-margin-bottom">
        <div className="table">
          <div className="usa-alert usa-alert-error" role="alert">
            <div className="usa-alert-body">
              <h5 className="usa-alert-heading">{i18n.t('login.error.title')}</h5>
              <p>{errorMessage}</p>
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

    const { saml } = this.state

    return (
      <div id="saml" className="auth saml">
        <form method="post" action={saml.URL}>
          <input
            type="hidden"
            name="SAMLRequest"
            value={saml.Base64XML}
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

    const { errors } = this.props
    const { username, password, showPassword } = this.state
    const pwClass = classnames(
      'password',
      'help',
      { 'usa-input-error': errors && errors.length }
    )

    const showPasswordButtonTitle = showPassword
      ? i18n.t('login.basic.hide.title')
      : i18n.t('login.basic.show.title')

    const showPasswordButtonText = showPassword
      ? i18n.t('login.basic.hide.text')
      : i18n.t('login.basic.show.text')

    return (
      <div id="basic" className="auth basic">
        <form onSubmit={this.login}>
          <div>
            <label htmlFor="user">{i18n.t('login.basic.username.label')}</label>
            <input
              id="user"
              name="user"
              type="text"
              value={username}
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
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={this.onPasswordChange}
            />
            <div className="peek">
              <button
                type="button"
                id="show-password"
                onClick={this.togglePassword}
                title={showPasswordButtonTitle}
              >
                {showPasswordButtonText}
              </button>
            </div>
            {this.errorMessage()}
          </div>
          <div>
            <button type="submit" className="usa-button-big">
              {i18n.t('login.basic.button')}
            </button>
            <a
              id="forgot-password"
              href="#TODO"
              title={i18n.t('login.basic.forgot.title')}
            >
              {i18n.t('login.basic.forgot.text')}
            </a>
          </div>
        </form>
      </div>
    )
  }

  loginForm() {
    const saml = this.authSAML()
    const basic = this.authBasic()

    const loginFormClass = classnames('table', {
      two: saml && basic,
      one: (saml && !basic) || (!saml && basic),
      zero: !saml && !basic,
    })

    return (
      <div className={loginFormClass}>
        {saml}
        {basic}
      </div>
    )
  }

  render() {
    const { dispatch, authenticated } = this.props

    const modalOpen = document.body.classList.contains('modal-open')
    return (
      <div className="login eapp-core" id="login">
        <Consent dispatch={dispatch} />
        <div
          id="seal-header"
          className="seal-header text-center"
          aria-hidden={modalOpen}
          aria-disabled={modalOpen}
        >
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
          aria-disabled={modalOpen}
        >
          {!authenticated && this.loginForm()}
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  authenticated: PropTypes.bool,
  history: PropTypes.object,
  dispatch: PropTypes.func,
  errors: PropTypes.array,
}

Login.defaultProps = {
  authenticated: false,
  history: {},
  dispatch: () => {},
  errors: null,
}

/**
 * Maps the relevant subtree state from the applications state tree.
 * In this case, we pull the authentication sub-state. This is mapped
 * to the authentication reducer. When actions are dispatched, this
 * method is executed which causes a re-render.
 */
function mapStateToProps(state) {
  const { authentication } = state

  return {
    authenticated: authentication.authenticated,
    errors: authentication.error,
  }
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default withRouter(connect(mapStateToProps)(Login))
