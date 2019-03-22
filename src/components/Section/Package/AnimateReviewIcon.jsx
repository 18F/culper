import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import i18n from 'util/i18n'

class AnimatedReviewIcon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      initial: true,
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({ initial: false })
    })
  }

  render() {
    const { valid } = this.props
    const { initial } = this.state

    const classes = classnames({
      'opacity-0': initial,
      'opacity-1': !initial,
    })

    const image = valid
      ? (
        <img
          src="/img/review-correct-all.svg"
          style={{ zIndex: '100' }}
          className={classes}
          alt={i18n.t('review.correctAllSvg')}
        />
      )
      : (
        <img
          src="/img/review-error.svg"
          style={{ zIndex: '100' }}
          className={classes}
          alt={i18n.t('review.reviewErrorSvg')}
        />
      )

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

AnimatedReviewIcon.propTypes = {
  valid: PropTypes.bool,
}

AnimatedReviewIcon.defaultProps = {
  valid: false,
}

export default AnimatedReviewIcon
