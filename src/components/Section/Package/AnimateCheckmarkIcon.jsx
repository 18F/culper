import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Svg } from 'components/Form'

class AnimatedCheckmarkIcon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      initial: true,
      done: false,
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ initial: false })
    })
  }

  onInitialTransitionEnd = () => {
    this.setState({ initial: false, done: true })
  }

  render() {
    const { valid } = this.props
    const { initial, done } = this.state

    const classes = classnames({
      'scale-down': !initial,
    })

    const reviewClasses = classnames({
      'scale-up': done,
      'scale-down': !done,
    })

    const image = valid
      ? <Svg src="/img/checkmark.svg" />
      : <Svg src="/img/submit-error.svg" />

    return (
      <span>
        <span
          className={classes}
          onTransitionEnd={this.onInitialTransitionEnd}
        >
          <Svg className="checkmark" src="/img/checkmark.svg" />
        </span>
        <span className={reviewClasses}>
          {image}
        </span>
      </span>
    )
  }
}

AnimatedCheckmarkIcon.propTypes = {
  valid: PropTypes.bool,
}

AnimatedCheckmarkIcon.defaultProps = {
  valid: false,
}

export default AnimatedCheckmarkIcon
