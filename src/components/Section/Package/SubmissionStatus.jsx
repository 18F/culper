import React from 'react'
import { i18n } from '../../../config'
import { Show, Svg } from '../../Form'

/**
 * SubmissionStatus allows for three modes.
 *
 * 1. Pass in transition true to show animation of progress bar. Once the progress
 * bar is filled, the onTransitionEnd callback is executed
 * 2. Pass in valid = true and the bar is rendered green
 * 3. Pass in valid = false and the bar is rendered red
 */
export default class SubmissionStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: this.props.transition ? 0 : 100
    }
    this.transitionEnd = this.transitionEnd.bind(this)
  }

  componentDidMount() {
    if (this.props.transition) {
      window.setTimeout(() => {
        this.setState({
          width: 100
        })
      }, 200)
    }
  }

  transitionEnd() {
    if (this.props.transition) {
      this.props.onTransitionEnd()
    }
  }

  render() {
    let text = i18n.m(`application.submissionStatus.validating`)
    let classes = ['submission-status']

    if (!this.props.transition) {
      switch (this.props.valid) {
        case true:
          text = i18n.m(`application.submissionStatus.valid`)
          classes.push('valid')
          break
        case false:
          text = i18n.m(`application.submissionStatus.invalid`)
          classes.push('invalid')
          break
      }
    }

    const style = {
      width: `${this.state.width}%`
    }

    // When transition class is applied, css3 transition is triggered
    const progressClass = [
      'progress',
      this.props.transition ? 'transition' : ''
    ]
    return (
      <div className={classes.join(' ')}>
        {text}
        <div className="progress-container">
          <div className="review-icon">
            <Show when={this.props.transition}>
              <img src="/img/review-checking.svg" />
            </Show>
            <Show when={!this.props.transition}>
              <AnimateReviewIcon {...this.props} />
            </Show>
          </div>
          <div className="progress-outline">
            <div className="progress-default">
              <div
                className={progressClass.join(' ')}
                style={style}
                onTransitionEnd={this.transitionEnd}
              />
            </div>
          </div>
          <div className="icon-container">
            <span className="icon">
              <Show when={this.props.transition}>
                <Svg src="/img/checkmark.svg" />
              </Show>
              <Show when={!this.props.transition}>
                <AnimateCheckmarkIcon {...this.props} />
              </Show>
            </span>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export class AnimateReviewIcon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initial: true
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ initial: false })
    })
  }

  render() {
    let reviewClass = ''
    if (this.state.initial) {
      reviewClass = 'opacity-0'
    } else {
      reviewClass = 'opacity-1'
    }
    let image = null
    if (this.props.valid) {
      image = (
        <img
          src="/img/review-correct-all.svg"
          style={{ zIndex: '100' }}
          className={reviewClass}
          alt={i18n.t('review.correctAllSvg')}
        />
      )
    } else {
      image = (
        <img
          src="/img/review-error.svg"
          style={{ zIndex: '100' }}
          className={reviewClass}
          alt={i18n.t('review.reviewErrorSvg')}
        />
      )
    }
    return (
      <div>
        <img
          src="/img/review-checking.svg"
          style={{ zIndex: '10' }}
          alt={i18n.t('review.checkingSvg')}
        />
        {image}
      </div>
    )
  }
}

export class AnimateCheckmarkIcon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initial: true,
      done: false
    }

    this.onInitialTransitionEnd = this.onInitialTransitionEnd.bind(this)
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ initial: false })
    })
  }

  onInitialTransitionEnd() {
    this.setState({ initial: false, done: true })
  }

  render() {
    let defaultClass = {}
    let reviewClass = {}
    let image = null

    if (this.props.valid) {
      image = <Svg src="/img/checkmark.svg" />
    } else {
      image = <Svg src="/img/submit-error.svg" />
    }
    if (!this.state.initial) {
      defaultClass = 'scale-down'
    }
    if (this.state.done) {
      reviewClass = 'scale-up'
    } else {
      reviewClass = 'scale-down'
    }

    return (
      <span>
        <span
          className={defaultClass}
          onTransitionEnd={this.onInitialTransitionEnd}>
          <Svg className="checkmark" src="/img/checkmark.svg" />
        </span>
        <span className={reviewClass}>{image}</span>
      </span>
    )
  }
}

SubmissionStatus.defaultProps = {
  transition: false,
  onTransitionEnd: () => {}
}
