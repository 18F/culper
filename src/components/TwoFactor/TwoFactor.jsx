import React from 'react'
import { connect } from 'react-redux'
import { qrcode, twofactor } from '../../actions/AuthActions'
import { api } from '../../services/api'

class TwoFactor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isVerified: false,
      username: this.props.username,
      token: '',
      png: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    if (!this.state.isVerified) {
      // Get the QR code from the API
      let self = this
      this.props.dispatch(
        qrcode(this.state.username)
          .then(function (response) {
            self.setState({png: response.data})
          }))
    }
  }

  base64png () {
    return 'data:image/png;base64,' + this.state.png
  }

  handleChange (event) {
    this.setState({ token: event.target.value })
  }

  handleSubmit (event) {
    // Send request to API to validate token
    event.preventDefault()
    this.props.dispatch(twofactor(this.state.username, this.state.token))
  }

  render () {
    if (this.state.isVerified) {
      return (
        <div>
          <input type="text" value={this.state.token} onChange={this.handleChange} />
          <button type="button" onClick={this.handleSubmit}>Verify</button>
        </div>
      )
    } else {
      return (
        <div>
          <img width="256" height="256" alt="Two factor authentication" src={this.base64png()} />
          <input type="text" value={this.state.token} onChange={this.handleChange} />
          <button type="button" onClick={this.handleSubmit}>Verify</button>
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
    token: auth.token
  }
}

// Wraps the the App component with connect() which adds the dispatch()
// function to the props property for this component
export default connect(mapStateToProps)(TwoFactor)
