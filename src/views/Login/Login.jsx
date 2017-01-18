import React from 'react'
import { LoginOAuth, TwoFactor } from '../../components'
import { connect } from 'react-redux'
import { i18n } from '../../config'
import { login } from '../../actions/AuthActions'
import { push } from '../../middleware/history'

class Login extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      authenticated: false,
      twofactor: false,
      username: '',
      password: ''
    }

    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.login = this.login.bind(this)
  }

  componentWillMount () {
    // If user is authenticated, redirect to home page
    if (this.props.authenticated && this.props.twofactor) {
      this.props.dispatch(push('/form'))
    }
  }

  onUsernameChange (e) {
    this.setState({username: e.target.value})
  }

  onPasswordChange (e) {
    this.setState({password: e.target.value})
  }

  login (event) {
    event.preventDefault()
    // TODO Validation rules
    this.props.dispatch(login(this.state.username, this.state.password))
  }

  render () {
    if (this.props.authenticated && !this.props.twofactor) {
      return (
        <div id="login" className="usa-grid">
          <div id="info" className="usa-width-one-whole">
            <h2>{i18n.t('login.twofactor.title')}</h2>
            <p>{i18n.t('login.twofactor.para')}</p>
            <ul>
              <li><a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en">Download Google authenticator for Android</a></li>
              <li><a href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8">Download Google authenticator for iOS</a></li>
            </ul>
          </div>
          <div id="twofactor" className="usa-width-one-whole">
            <TwoFactor username={this.state.username} />
          </div>
        </div>
      )
    } else {
      return (
        <div id="login" className="usa-grid">
          <div id="info" className="usa-width-one-whole">
            <h2>{i18n.t('login.title')}</h2>
            <p>{i18n.t('login.para')}</p>
          </div>

          <div id="basic" className="usa-width-one-whole">
            <form onSubmit={this.login}>
              <div className="eapp-field-wrap">
                <label htmlFor="username">Username</label>
                <input id="username"
                       type="text"
                       placeholder={i18n.t('login.placeholder.username')}
                       autoFocus
                       value={this.state.username}
                       onChange={this.onUsernameChange}/>
              </div>
              <div className="eapp-field-wrap">
                <label htmlFor="password">Password</label>
                <input id="password"
                       type="password"
                       placeholder={i18n.t('login.placeholder.password')}
                       value={this.state.password}
                       onChange={this.onPasswordChange} />
              </div>
              {this.props.error ? (<div>{this.props.error}</div>) : ''}
              <div>
                <a id="forgot-password" href="#" title={i18n.t('login.forgot.title')}>{i18n.t('login.forgot.text')}</a>
              </div>
              <div>
                <button type="submit">{i18n.t('login.submit')}</button>
              </div>
            </form>
          </div>

          <div id="oauth" className="usa-width-one-whole hidden">
            <span>Sign in with</span>
            <LoginOAuth authenticated={this.state.authenticated}>
              <i className="fa fa-github" aria-hidden="true"></i>
            </LoginOAuth>
          </div>
        </div>
      )
    }
  }
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
