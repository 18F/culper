import React from 'react'
import { i18n } from '../../../config'
import { Show, Svg } from '../../Form'

export default class SubmissionStatus extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      width: this.props.transition ? 0 : 100
    }
    this.transitionEnd = this.transitionEnd.bind(this)
  }

  componentDidMount () {
    if (this.props.transition) {
      window.setTimeout(() => {
        this.setState({
          width: 100
        })
      }, 200)
    }
  }

  transitionEnd () {
    if (this.props.transition) {
      this.props.onTransitionEnd()
    }
  }

  render () {
    let text = i18n.m(`submission.submissionStatus.validating`)
    let classes = ['submission-status']

    if (!this.props.transition) {
      switch (this.props.valid) {
        case true:
          text = i18n.m(`submission.submissionStatus.valid`)
          classes.push('valid')
          break
        case false:
          text = i18n.m(`submission.submissionStatus.invalid`)
          classes.push('invalid')
          break
      }
    }

    const style = {
      width: `${this.state.width}%`
    }
    const progressClass = ['progress', this.props.transition ? 'transition' : '']

    return (
      <div className={classes.join(' ')}>
        { text }
        <div className="progress-container">
          <div className="review-icon">
            <Show when={!this.props.transition || this.props.valid}>
              <img src="/img/review-correct-all.svg" />
            </Show>
            <Show when={this.props.transition && !this.props.valid}>
              <img src="/img/review-error.svg" />
            </Show>
          </div>
          <div className="progress-outline">
            <div className="progress-default">
              <div className={progressClass.join(' ')} style={style} onTransitionEnd={this.transitionEnd}></div>
            </div>
          </div>
          <div className="icon-container">
            <span className="icon">
              <Show when={!this.props.transition || this.props.valid}>
                <Svg src="/img/checkmark.svg" />
              </Show>
              <Show when={this.props.transition && !this.props.valid}>
                <Svg src="/img/exclamation.svg" />
              </Show>
            </span>
          </div>
        </div>
        { this.props.children }
      </div>
    )
  }
}

SubmissionStatus.defaultProps = {
  transition: false,
  onTransitionEnd: () => {}
}
