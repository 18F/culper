import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../config'
import AuthenticatedView from '../../views/AuthenticatedView'
import { Show } from '../Form'
import { saveSection } from '../../middleware/history'

class SavedIndicator extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      interval: props.interval || 1000,
      elapsed: props.elapsed || 0,
      hover: false,
      animate: false
    }

    this.save = this.save.bind(this)
    this.tick = this.tick.bind(this)
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

  save () {
    const application = this.props.app
    const section = this.props.section.section
    const subsection = this.props.section.subsection
    const self = this

    saveSection(application, section, subsection, this.props.dispatch, () => {
      self.setState({animate: false})
    })
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
    const klass = `saved-indicator ${this.state.animate ? 'active' : ''}`.trim()
    const klassCircle = `spinner-icon ${this.state.animate ? 'spin' : ''}`.trim()
    const klassIcon = `fa fa-floppy-o ${this.state.animate ? 'invert' : ''}`.trim()
    return (
    <button className={klass}
            onClick={this.save}
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}>

      <div className="spinner">
        <div className={klassCircle}></div>
        <i className={klassIcon} aria-hidden="true"></i>
      </div>

      <span className="spinner-label">
        <Show when={this.state.animate}>
          <strong className="one-line">{i18n.t('saved.saving')}</strong>
        </Show>
        <Show when={!this.state.animate && this.state.hover}>
          <strong className="one-line">{i18n.t('saved.action')}</strong>
        </Show>
        <Show when={!this.state.animate && !this.state.hover}>
          <strong>{i18n.t('saved.saved')}</strong>
          <span className="time">{this.calculateTime()}</span>
        </Show>
      </span>
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
