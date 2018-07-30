import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { api } from '../../../services'
import { updateApplication } from '../../../actions/ApplicationActions'
import { tokenError } from '../../../actions/AuthActions'
import { saveSection } from '../../SavedIndicator/persistence-helpers'
import Modal from '../Modal'
import Svg from '../Svg'

export const roundUp = (num, precision) => {
  return Math.ceil(num * precision) / precision
}

export const minutes = (ms) => {
  return parseInt(roundUp(ms / (60*1000), 1), 10)
}

export const seconds = (ms) => {
  return parseInt(roundUp(ms / 1000, 1), 10)
}

export class TimeoutWarning extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showWarning: this.props.showWarning,
      interval: props.interval || 60 * 1000,
      countdown: 60
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.onClick = this.onClick.bind(this)
    this.tick = this.tick.bind(this)
    this.timer = null
  }

  componentDidMount () {
    this.resetInterval()
  }

  componentWillUnmount () {
    window.clearInterval(this.timer)
  }

  tick () {
    const now = new Date().getTime()
    const last = this.props.lastRefresh
    const timeoutInMilliseconds = this.props.timeout * 60 * 1000
    const diff = now - last
    if (seconds(diff) >= seconds(timeoutInMilliseconds)) {
      // Session has expired
      this.props.dispatch(tokenError())
    } else if (this.state.showWarning) {
      // Ticks are to count down by seconds now
      this.setState({ countdown: seconds(timeoutInMilliseconds - diff) })
    } else {
      // Ticks should be checking if in the last minute of the session
      if (minutes(diff) >= this.props.timeout - 1) {
        const application = this.props.app
        const section = this.props.section.section
        const subsection = this.props.section.subsection
        const dispatcher = this.props.dispatch
        this.setState({ showWarning: true, interval: 1000, countdown: seconds(timeoutInMilliseconds - diff) }, () => {
          // Save the form
          saveSection(application, section, subsection, dispatcher)
          // Change the timer interval
          this.resetInterval()
        })
      }
    }
  }

  onDismiss () {
    this.refreshToken()
  }

  onClick () {
    this.setState({ showWarning: false, interval: 60 * 1000, countdown: 60 }, () => {
      // Change the timer interval
      this.resetInterval()
      // Refresh the token
      this.refreshToken()
    })
  }

  resetInterval () {
    if (this.timer) {
      window.clearInterval(this.timer)
    }
    this.timer = window.setInterval(this.tick, this.state.interval)
  }

  refreshToken () {
    const self = this
    api.refresh().then(r => {
      api.setToken(r.data)
      if (r.data === '') {
        self.props.dispatch(tokenError())
      } else {
        self.props.dispatch(updateApplication('Settings', 'lastRefresh', new Date().getTime()))
      }
    }).catch(() => {
      api.setToken('')
      self.props.dispatch(tokenError())
    })
  }

  message () {
    return i18n.t('application.timeout.message').replace('{time}', this.state.countdown)
  }

  render () {
    return (
      <div className="timeout-warning">
        <Modal show={this.state.showWarning}
               onDismiss={this.onDismiss}>
          <Svg src="/img/timeout-icon.svg" />
          <h2>{i18n.t('application.timeout.title')}</h2>
          <p>{this.message()}</p>
          <button title={i18n.t('application.timeout.button')} aria-label={i18n.t('application.timeout.button')} onClick={this.onClick}>
            <div>
              <span>{i18n.t('application.timeout.button')}</span>
              <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
            </div>
          </button>
        </Modal>
      </div>
    )
  }
}

TimeoutWarning.defaultProps = {
  lastRefresh: null,
  showWarning: false,
  timeout: 15,
  dispatch: (action) => {}
}

function mapStateToProps (state) {
  const section = state.section || {}
  const app = state.application || {}
  const settings = app.Settings || {}
  return {
    section: section,
    app: app,
    lastRefresh: settings.lastRefresh
  }
}

export default connect(mapStateToProps)(TimeoutWarning)
