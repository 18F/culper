import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { i18n } from 'config'

import { renewSession } from 'actions/AuthActions'

import { saveSection } from 'components/SavedIndicator/persistence-helpers'

import Modal from 'components/Form/Modal'
import Svg from 'components/Form/Svg'

export class TimeoutWarning extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      countdown: 60,
    }

    this.interval = 1000 // tick every second
    this.timer = null
  }

  componentDidMount() {
    this.resetInterval()
    this.autosave()
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

  onClick = () => {
    const { dispatch } = this.props
    dispatch(renewSession())
  }

  autosave = () => {
    const { application, section, dispatch } = this.props

    // Save the form
    saveSection(application, section.section, section.subsection, dispatch)
    // TODO error handling
  }

  tick = () => {
    const { countdown } = this.state

    const newCountdown = countdown - 1

    if (newCountdown >= 0) {
      this.setState({
        countdown: newCountdown,
      })
    } else {
      // TODO logout
      console.log('LOGOUT')
      window.clearInterval(this.timer)
    }
  }

  resetInterval = () => {
    if (this.timer) window.clearInterval(this.timer)
    this.timer = window.setInterval(this.tick, this.interval)
  }

  render() {
    const { countdown } = this.state

    const message = i18n.t('application.timeout.message')
      .replace('{time}', countdown)

    return (
      <div className="timeout-warning">
        <Modal show={true}>
          <Svg src="/img/timeout-icon.svg" />
          <h2>{i18n.t('application.timeout.title')}</h2>
          <p>{message}</p>
          <button
            type="button"
            title={i18n.t('application.timeout.button')}
            aria-label={i18n.t('application.timeout.button')}
            onClick={this.onClick}
          >
            <div>
              <span>{i18n.t('application.timeout.button')}</span>
              <i className="fa fa-arrow-circle-right" aria-hidden="true" />
            </div>
          </button>
        </Modal>
      </div>
    )
  }
}

TimeoutWarning.propTypes = {
  application: PropTypes.object,
  section: PropTypes.object,
  dispatch: PropTypes.func,
}

TimeoutWarning.defaultProps = {
  application: {},
  section: {},
  dispatch: () => {},
}

function mapStateToProps(state) {
  const { application, section } = state

  return {
    application,
    section,
    lastRefresh: application.Settings.lastRefresh,
  }
}

export default connect(mapStateToProps)(TimeoutWarning)
