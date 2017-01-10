import React from 'react'
import { connect } from 'react-redux'
import { qrcode, twofactor } from '../../actions/AuthActions'

class TwoFactor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    // Get the QR code from the API
    this.props.dispatch(qrcode(this.props.username))
  }

  base64png () {
    return 'data:image/png;base64,' + this.props.qrcode
  }

  handleChange (event) {
    this.setState({ token: event.target.value })
  }

  handleSubmit (event) {
    // Send request to API to validate token
    event.preventDefault()
    if (this.state.token !== '') {
      this.props.dispatch(twofactor(this.props.username, this.state.token))
    }
  }

  render () {
    if (!this.props.qrcode) {
      return (
        <form onSubmit={this.handleSubmit}>
          <div id="twofactor-component">
            <input type="text" value={this.state.token} onChange={this.handleChange} ref="token" autoFocus />
            { this.props.error ? (<div>{this.props.error}</div>) : '' }
            <button type="submit">Verify</button>
          </div>
        </form>
      )
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <div id="twofactor-component">
            <img width="256" height="256" alt="Two factor authentication" src={this.base64png()} />
            <input type="text" value={this.state.token} onChange={this.handleChange} ref="token" autoFocus />
            { this.props.error ? (<div>{this.props.error}</div>) : '' }
            <button type="submit">Verify</button>
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
