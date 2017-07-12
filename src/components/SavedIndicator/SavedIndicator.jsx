import React from 'react'
import { connect } from 'react-redux'
import { updateApplication } from '../../actions/ApplicationActions'
import { i18n } from '../../config'
import AuthenticatedView from '../../views/AuthenticatedView'
import { Show } from '../Form'

class SavedIndicator extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      interval: props.interval || 1000,
      elapsed: props.elapsed || 0,
      hover: false
    }

    this.tick = this.tick.bind(this)
    this.reset = this.reset.bind(this)
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  componentWillReceiveProps (next) {
    this.setState({elapsed: 0})
  }

  componentDidMount () {
    this.timer = window.setInterval(this.tick, this.state.interval)
  }

  componentWillUnmount () {
    window.clearInterval(this.timer)
  }

  reset (event) {
    this.props.dispatch(updateApplication('Settings', 'saved', new Date()))
    this.setState({elapsed: 0})
  }

  mouseEnter (event) {
    this.setState({hover: true})
  }

  mouseLeave (event) {
    this.setState({hover: false})
  }

  tick () {
    const currentTick = new Date().getTime()
    let s = currentTick
    if (this.props && this.props.saved) {
      s = this.props.saved.getTime()
    }

    this.setState({elapsed: currentTick - s})
  }

  calculateTime () {
    // If there has been no time elapsed...
    if (!this.state.elapsed) {
      return i18n.t('saved.now')
    }

    // Get the time in seconds
    let timespan = this.state.elapsed / 1000

    // Determine the unit of measurement and then adjust the timespan
    // rounding the value
    let unit = ''
    if (timespan / (24 * 60 * 60) >= 1) {
      timespan /= 24 * 60 * 60
      timespan = Math.round(timespan)
      unit = timespan > 1 ? i18n.t('saved.days') : i18n.t('saved.day')
    } else if (timespan / (60 * 60) >= 1) {
      timespan /= 60 * 60
      timespan = Math.round(timespan)
      unit = timespan > 1 ? i18n.t('saved.hours') : i18n.t('saved.hour')
    } else if (timespan / 60 >= 1) {
      timespan /= 60
      timespan = Math.round(timespan)
      unit = timespan > 1 ? i18n.t('saved.minutes') : i18n.t('saved.minute')
    } else {
      timespan = Math.round(timespan)
      if (timespan < 1) {
        return i18n.t('saved.now')
      }
      unit = timespan === 1 ? i18n.t('saved.second') : i18n.t('saved.seconds')
    }

    return `${timespan} ${unit} ${i18n.t('saved.ago')}`
  }

  render () {
    return (
      <button className="saved-indicator"
              onClick={this.reset}
              onMouseEnter={this.mouseEnter}
              onMouseLeave={this.mouseLeave}>
        <i className="fa fa-floppy-o" aria-hidden="true"></i>
        <Show when={this.state.hover}>
          <strong>{i18n.t('saved.action')}</strong>
        </Show>
        <Show when={!this.state.hover}>
          <strong>{i18n.t('saved.saved')}</strong>
          <span className="time">{this.calculateTime()}</span>
        </Show>
      </button>
    )
  }
}

function mapStateToProps (state) {
  const section = state.section || {}
  const app = state.application || {}
  const settings = app.Settings || {}
  return {
    section: section,
    app: app,
    saved: settings.saved || new Date()
  }
}

export default connect(mapStateToProps)(AuthenticatedView(SavedIndicator))
