import React from 'react'
import { connect } from 'react-redux'
import { env, i18n } from '../../config'
import { qrcode, twofactor, twofactorreset } from '../../actions/AuthActions'
import { Show } from '../Form'

class TwoFactor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      code: this.props.code
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  componentDidMount () {
    // Get the QR code from the API
    this.props.dispatch(qrcode())
  }

  base64png () {
    if (!this.props.qrcode) {
      return ''
    }
    return 'data:image/png;base64,' + this.props.qrcode
  }

  handleChange (event) {
    this.setState({ code: event.target.value })
  }

  handleSubmit (event) {
    // Send request to API to validate token
    event.preventDefault()
    if (this.state.code !== '') {
      this.props.dispatch(twofactor(this.state.code))
    }
  }

  handleReset (event) {
    event.preventDefault()
    this.setState({ code: '' }, () => {
      this.props.dispatch(twofactorreset())
    })
  }

  errorMessage () {
    if (!this.props.error) {
      return ''
    }

    return (
      <div>{this.props.error}</div>
    )
  }

  render () {
    const qr = this.base64png()
    const mfa = this.props.mfa || env.MultipleFactorAuthentication()

    if (!mfa.enabled) {
      return <div>{i18n.m('twofactor.disabled')}</div>
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <div className="twofactor-component">
            <Show when={qr}>
              <img width="256" height="256" alt={i18n.t('twofactor.alt')} src={qr} />
            </Show>
            <input type="text" name="code" value={this.state.code} onChange={this.handleChange} aria-label="Token" autoFocus />
            <Show when={mfa.resettable}>
              <a href="javascript:;;" className="reset" onClick={this.handleReset}>Reset</a>
            </Show>
            { this.errorMessage() }
            <button type="submit">{i18n.t('twofactor.verify')}</button>
          </div>
        </form>
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
    qrcode: auth.qrcode,
    error: auth.error
  }
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(TwoFactor)
