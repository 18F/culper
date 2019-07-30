import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'

import i18n from 'util/i18n'
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

  componentDidMount() {
    const { interval } = this.state
    this.timer = window.setInterval(this.tick, interval)
  }

  componentWillReceiveProps() {
    this.setState({ elapsed: 0 })
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

  isRoute = route => (window.location.pathname || '').indexOf(route) !== -1

  save() {
    const { app, section, dispatch } = this.props

    // So, this is fun, it was determined the save button is not required on
    // `form/package/print` but should still be available on any other section
    // found in "Review and submit". The crux is saving within this section does
    // nothing since it was declared signatures should **only** be saved when
    // the form is **submitted**.
    //
    // So what we have here is a reset of the elapsed time when the save button
    // is clicked within the "Review and submit" section to provide comfort to
    // the end user.
    if (this.isRoute('form/package') && !this.isRoute('form/package/comments')) {
      this.setState({ elapsed: 0 })
      return
    }

    this.setState({ animate: true })

    saveSection(app, section.section, section.subsection, dispatch)
      .then(() => {
        this.setState({ animate: false })
      })
      .catch((error) => {
        this.setState({ animate: false })
        alert(error)
      })
  }

  mouseEnter() {
    this.setState({ hover: true })
  }

  mouseLeave() {
    this.setState({ hover: false })
  }

  tick() {
    const { saved } = this.props
    const currentTick = new Date().getTime()
    let s = currentTick
    if (this.props && saved) {
      s = saved.getTime()
    }

    this.setState({ elapsed: currentTick - s })
  }

  calculateTime() {
    const { elapsed } = this.state

    // If there has been no time elapsed...
    if (!elapsed) {
      return i18n.t('saved.now')
    }

    // Get the time in seconds
    let timespan = elapsed / 1000

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
    const { app } = this.props
    return !formIsLocked(app) && !this.isRoute('form/package/print')
  }

  render() {
    if (!this.allowed()) {
      return null
    }

    const { saveError } = this.props
    const { animate, hover } = this.state

    const buttonClasses = classnames(
      'saved-indicator',
      {
        active: animate,
        error: !animate && saveError,
      }
    )

    const circleClasses = classnames(
      'spinner-icon',
      { spin: animate }
    )

    const iconClasses = classnames(
      'fa', 'fa-floppy-o',
      { invert: animate }
    )

    // Determine the appropriate response for screen readers.
    let talkback = null
    if (!animate) {
      if (saveError) {
        talkback = i18n.t('saved.error.message')
      } else if (hover) {
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
          className={buttonClasses}
          aria-label={talkback}
          title={talkback}
          onClick={this.save}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
          type="button"
        >
          <div className="spinner">
            <div className={circleClasses} />
            <i className={iconClasses} aria-hidden="true" />
          </div>

          <span className="spinner-label">
            {(animate || (hover && !saveError)) && (
              <strong className="one-line">
                {animate ? i18n.t('saved.saving') : i18n.t('saved.action')}
              </strong>
            )}

            {!animate && !hover && !saveError && (
              <span>
                <strong>{i18n.t('saved.saved')}</strong>
                <span className="time">{this.calculateTime()}</span>
              </span>
            )}

            {!animate && saveError && (
              <span>
                <strong>{i18n.t('saved.error.title')}</strong>
                <span className="time">{i18n.t('saved.error.subtitle')}</span>
              </span>
            )}
          </span>
        </button>
      </div>
    )
  }
}

SavedIndicator.propTypes = {
  interval: PropTypes.number,
  elapsed: PropTypes.number,
  saveError: PropTypes.bool,
  app: PropTypes.object,
  saved: PropTypes.object,
  section: PropTypes.object,
  dispatch: PropTypes.func,
}

SavedIndicator.defaultProps = {
  interval: 1000,
  elapsed: 0,
  saveError: false,
  app: {},
  saved: {},
  section: {},
  dispatch: () => {},
}

function mapStateToProps(state) {
  const section = state.section || {}
  const app = state.application || {}
  const settings = app.Settings || {}
  return {
    section,
    app,
    saved: settings.saved || new Date(),
    saveError: settings.saveError,
  }
}

export { SavedIndicator }

export default connect(mapStateToProps)(SavedIndicator)
