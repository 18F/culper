import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../config'
import AuthenticatedView from '../../views/AuthenticatedView'

class SavedIndicator extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      interval: props.interval || 1000,
      elapsed: props.elapsed || 0
    }

    this.tick = this.tick.bind(this)
  }

  componentDidMount () {
    this.timer = window.setInterval(this.tick, this.state.interval)
  }

  componentWillUnmount () {
    window.clearInterval(this.timer)
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
      unit = timespan > 1 ? i18n.t('saved.seconds') : i18n.t('saved.second')
    }

    return `${timespan} ${unit} ${i18n.t('saved.ago')}`
  }

  render () {
    return (
      <div className="saved-indicator">
        <i className="fa fa-floppy-o" aria-hidden="true"></i>
        <strong>{i18n.t('saved.saved')}</strong> <span className="time">{this.calculateTime()}</span>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let app = state.application || {}
  let saved = app.Saved || {}
  return {
    saved: saved.date
  }
}

export default connect(mapStateToProps)(AuthenticatedView(SavedIndicator))
