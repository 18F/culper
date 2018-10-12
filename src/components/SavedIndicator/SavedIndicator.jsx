import React from 'react'
import { connect } from 'react-redux'
import { i18n } from 'config'
import { Show } from 'components/Form'
import { saveSection } from 'components/SavedIndicator/persistence-helpers'
import { formIsLocked } from 'validators'

class SavedIndicator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      interval: props.interval || 1000,
      elapsed: props.elapsed || 0,
      hover: false,
      animate: false,
    }

    this.save = this.save.bind(this)
    this.tick = this.tick.bind(this)
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  componentWillReceiveProps(next) {
    this.setState({ elapsed: 0 })
  }

  componentDidMount() {
    this.timer = window.setInterval(this.tick, this.state.interval)
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

  save() {
    const application = this.props.app
    const section = this.props.section.section
    const subsection = this.props.section.subsection
    const self = this

    // So, this is fun, it was determined the save button is not required on
    // `form/package/print` but should still be available on any other section
    // found in "Review and submit". The crux is saving within this section does
    // nothing since it was declared signatures should **only** be saved when
    // the form is **submitted**.
    //
    // So what we have here is a reset of the elapsed time when the save button
    // is clicked within the "Review and submit" section to provide comfort to
    // the end user.
    if (this.isRoute('form/package')) {
      self.setState({ elapsed: 0 })
      return
    }

    self.setState({ animate: true })

    saveSection(application, section, subsection, this.props.dispatch)
      .then(() => {
        self.setState({ animate: false })
      })
      .catch((error) => {
        self.setState({ animate: false })
        alert(error)
      })
  }

  mouseEnter(event) {
    this.setState({ hover: true })
  }

  mouseLeave(event) {
    this.setState({ hover: false })
  }

  tick() {
    const currentTick = new Date().getTime()
    let s = currentTick
    if (this.props && this.props.saved) {
      s = this.props.saved.getTime()
    }

    this.setState({ elapsed: currentTick - s })
  }

  calculateTime() {
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

  allowed() {
    return !formIsLocked(this.props.app) && !this.isRoute('form/package/print')
  }

  isRoute(route) {
    return (window.location.pathname || '').indexOf(route) !== -1
  }

  render() {
    if (!this.allowed()) {
      return null
    }

    const { saveError } = this.props
    const klass = `saved-indicator ${this.state.animate ? 'active' : ''} ${
      !this.state.animate && saveError ? 'error' : ''
    }`.trim()
    const klassCircle = `spinner-icon ${
      this.state.animate ? 'spin' : ''
    }`.trim()
    const klassIcon = `fa fa-floppy-o ${
      this.state.animate ? 'invert' : ''
    }`.trim()

    // Determine the appropriate response for screen readers.
    let talkback = null
    if (!this.state.animate) {
      if (saveError) {
        talkback = i18n.t('saved.error.message')
      } else if (this.state.hover) {
        talkback = i18n.t('saved.action')
      } else {
        talkback = `${i18n.t('saved.saved')} ${this.calculateTime()}. ${i18n.t(
          'saved.action'
        )}?`
      }
    } else {
      talkback = i18n.t('saved.saving')
    }

    return (
      <div className="saved-indicator-container">
        <button
          className={klass}
          aria-label={talkback}
          title={talkback}
          onClick={this.save}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
        >
          <div className="spinner">
            <div className={klassCircle} />
            <i className={klassIcon} aria-hidden="true" />
          </div>

          <span className="spinner-label">
            <Show when={this.state.animate}>
              <strong className="one-line">{i18n.t('saved.saving')}</strong>
            </Show>
            <Show when={!this.state.animate && this.state.hover && !saveError}>
              <strong className="one-line">{i18n.t('saved.action')}</strong>
            </Show>
            <Show when={!this.state.animate && !this.state.hover && !saveError}>
              <strong>{i18n.t('saved.saved')}</strong>
              <span className="time">{this.calculateTime()}</span>
            </Show>
            <Show when={!this.state.animate && saveError}>
              <strong>{i18n.t('saved.error.title')}</strong>
              <span className="time">{i18n.t('saved.error.subtitle')}</span>
            </Show>
          </span>
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const section = state.section || {}
  const app = state.application || {}
  const settings = app.Settings || {}
  return {
<<<<<<< HEAD
    section,
    app,
    saved: settings.saved || new Date(),
    saveError: settings.saveError,
=======
    section: section,
    app: app,
    saved: settings.saved || new Date(),
    saveError: settings.saveError
>>>>>>> Provide feedback to user if form fails to save
  }
}

export { SavedIndicator }

export default connect(mapStateToProps)(SavedIndicator)
