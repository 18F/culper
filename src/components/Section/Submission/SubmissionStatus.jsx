import React from 'react'
import { i18n } from '../../../config'
import { Show, Svg } from '../../Form'

export default class SubmissionStatus extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      transitioned: false,
      width: 0
    }
    this.transitionEnd = this.transitionEnd.bind(this)
  }

  componentDidMount () {
    window.setTimeout(() => {
      this.setState({
        width: 100
      })
    }, 200)
  }

  componentWillReceiveProps () {

  }

  transitionEnd () {
    this.setState({ transitioned: true })
  }

  render () {
    let text = i18n.m(`submission.submissionStatus.validating`)
    let classes = ['submission-status']

    if (this.state.transitioned) {
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

    return (
      <div className={classes.join(' ')}>
        { text }
        <div className="progress-container">
          <div className="review-icon">
            <Show when={!this.state.transitioned || this.props.valid}>
              <img src="/img/review-correct-all.svg" />
            </Show>
            <Show when={this.state.transitioned && !this.props.valid}>
              <img src="/img/review-error.svg" />
            </Show>
          </div>
          <div className="progress-outline">
            <div className="progress-default">
              <div className="progress" style={style} onTransitionEnd={this.transitionEnd}></div>
            </div>
          </div>
          <div className="icon-container">
            <span className="icon">
              <Show when={!this.state.transitioned || this.props.valid}>
                <Svg src="/img/checkmark.svg" />
              </Show>
              <Show when={this.state.transitioned && !this.props.valid}>
                <Svg src="/img/exclamation.svg" />
              </Show>
            </span>
          </div>
        </div>
        <Show when={this.state.transitioned}>
          { this.props.children }
        </Show>
      </div>
    )
  }
}

SubmissionStatus.defaultProps = {
}
