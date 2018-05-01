import React from 'react'
import { TwoFactor } from '../../components'
import { connect } from 'react-redux'
import { i18n, env } from '../../config'
import { api, getQueryValue, getCookieValue, deleteCookie } from '../../services'
import { login, handleLoginSuccess } from '../../actions/AuthActions'
import { push } from '../../middleware/history'
import { Consent, Show } from '../../components/Form'

export class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: this.props.authenticated,
      twofactor: this.props.twofactor,
      username: this.props.username,
      password: this.props.password,
      showPassword: this.props.showPassword,
      saml: {}
    }

    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.togglePassword = this.togglePassword.bind(this)
    this.login = this.login.bind(this)
    this.mfa = env.MultipleFactorAuthentication()
  }

  componentWillMount () {
    this.redirect()
    if (env.SamlEnabled()) {
      api.saml().then((response) => {
        this.setState({ saml: response.data || {} })
      })
    }
  }

  redirect () {
    // If user is authenticated, redirect to home page
    if (this.props.authenticated && this.props.twofactor) {
      this.props.dispatch(push('/loading'))
      return
    }

    const token = getCookieValue('token')
    if (token) {
      deleteCookie('token')
      api.setToken(token)
      this.props.dispatch(handleLoginSuccess())
      this.props.dispatch(push('/loading'))
      return
    }

    const err = getQueryValue('error')
    if (err) {
      switch (err) {
      case 'token':
        this.props.dispatch(push('/token'))
        return
      case 'access_denied':
        this.props.dispatch(push('/accessdenied'))
        return
      }
    }
  }

  onUsernameChange (e) {
    if (env.BasicAuthenticationEnabled()) {
      this.setState({username: e.target.value})
    }
  }

  onPasswordChange (e) {
    if (env.BasicAuthenticationEnabled()) {
      this.setState({password: e.target.value})
    }
  }

  togglePassword () {
    if (env.BasicAuthenticationEnabled()) {
      this.setState({showPassword: !this.state.showPassword})
    }
  }

  login (event) {
    event.preventDefault()
    if (env.BasicAuthenticationEnabled()) {
      this.props.dispatch(login(this.state.username, this.state.password))
    }
  }

  errorMessage () {
    if (!this.props.error) {
      return ''
    }

    const msg = this.props.error.indexOf('pg: ') === -1
          ? this.props.error
          : i18n.m('login.error.generic')

    return (
      <div className="field no-margin-bottom">
        <div className="table">
          <div className="messages">
            <div className="message error">
              <i className="fa fa-exclamation"></i>
              <h5>{i18n.t('login.error.title')}</h5>
              <p>{msg}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  authSAML () {
    if (!env.SamlEnabled()) {
      return null
    }

    return (
      <div id="saml" className="auth saml">
        <form method="post" action={this.state.saml.URL}>
          <input type="hidden" name="SAMLRequest" value={this.state.saml.Base64XML} />
          <h2>{i18n.t('login.saml.title')}</h2>
          {i18n.m('login.saml.para')}
          <button type="submit">
            <span>{i18n.t('login.saml.button')}</span>
          </button>
        </form>
      </div>
    )
  }

  authBasic () {
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
        <h2>{i18n.t('login.basic.title')}</h2>
        <p>{i18n.t('login.basic.para')}</p>
        <form onSubmit={this.login}>
          <div>
            <label htmlFor="user">
              {i18n.t('login.basic.username.label')}
            </label>
            <input id="user"
                   name="user"
                   type="text"
                   placeholder={i18n.t('login.basic.username.placeholder')}
                   value={this.state.username}
                   onChange={this.onUsernameChange} />
          </div>
          <div className={pwClass}>
            <label htmlFor="password">
              {i18n.t('login.basic.password.label')}
            </label>
            <input id="password"
                   name="password"
                   type={this.state.showPassword ? 'text' : 'password'}
                   placeholder={i18n.t('login.basic.password.placeholder')}
                   value={this.state.password}
                   onChange={this.onPasswordChange} />
            <div className="peek">
              <a id="show-password"
                 onClick={this.togglePassword}
                 href="javascript:;;"
                 title={i18n.t(`login.basic.${this.state.showPassword ? 'hide' : 'show'}.title`)}>
                {i18n.t(`login.basic.${this.state.showPassword ? 'hide' : 'show'}.text`)}
              </a>
            </div>
            {this.errorMessage()}
          </div>
          <div>
            <button type="submit">{i18n.t('login.basic.button')}</button>
            <a id="forgot-password"
               href="javascript:;;"
               title={i18n.t('login.basic.forgot.title')}>
              {i18n.t('login.basic.forgot.text')}
            </a>
          </div>
        </form>
      </div>
    )
  }

  loginFormClass (auths) {
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

  loginForm () {
    const saml = this.authSAML()
    const basic = this.authBasic()

    return (
      <div className={this.loginFormClass([saml, basic])}>
        {saml}
        {basic}
      </div>
    )
  }

  twofactorForm () {
    return (
      <div className="table one">
        <div id="info" className="auth two-factor">
          <h2>{i18n.t('login.twofactor.title')}</h2>
          {i18n.m('login.twofactor.para')}
          <ul>
            <li><a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en">Download Google authenticator for Android</a></li>
            <li><a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8">Download Google authenticator for iOS</a></li>
          </ul>
          <TwoFactor />
        </div>
      </div>
    )
  }

  render () {
    const modalOpen = document.body.classList.contains('modal-open')
    return (
      <div className="login eapp-core" id="login">
        <Consent dispatch={this.props.dispatch} />
        <div id="seal-header" className="seal-header text-center" aria-hidden={modalOpen} aria-disabled={modalOpen}>
          <div className="content">
            <img src="/img/US-OfficeOfPersonnelManagement-Seal.svg" alt="U.S. Office of Personnel Management" />
            <h2>{i18n.t('login.title')}</h2>
          </div>
        </div>
        <div className="content" aria-hidden={modalOpen} aria-disabled={modalOpen}>
          {this.props.authenticated && this.mfa.enabled && !this.props.twofactor && this.twofactorForm()}
          {!this.props.authenticated && this.loginForm()}
        </div>
      </div>
    )
  }
}

Login.defaultProps = {
  authenticated: false,
  twofactor: false,
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
function mapStateToProps (state) {
  const auth = state.authentication
  return {
    authenticated: auth.authenticated,
    twofactor: auth.twofactor,
    token: auth.token,
    error: auth.error
  }
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(Login)
