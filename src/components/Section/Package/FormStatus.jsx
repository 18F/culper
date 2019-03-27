import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Svg } from 'components/Form'
import AnimateReviewIcon from './AnimateReviewIcon'
import AnimateCheckmarkIcon from './AnimateCheckmarkIcon'

const FormStatus = ({
  progressWidth, isValid, isTransitioning, onTransitionEnd,
}) => (
  <div className="progress-container">
    <div className="review-icon">
      {isTransitioning ? (
        <img src="/img/review-checking.svg" alt="" />
      ) : (
        <AnimateReviewIcon valid={isValid} />
      )}
    </div>
    <div className="progress-outline">
      <div className="progress-default">
        <div
          className={classnames('progress', { transition: isTransitioning })}
          style={{ width: `${progressWidth}%` }}
          onTransitionEnd={onTransitionEnd}
        />
      </div>
    </div>
    <div className="icon-container">
      <span className="icon">
        {isTransitioning ? (
          <Svg src="/img/checkmark.svg" />
        ) : (
          <AnimateCheckmarkIcon valid={isValid} />
        )}
      </span>
    </div>
  </div>
)

FormStatus.propTypes = {
  progressWidth: PropTypes.number,
  isValid: PropTypes.bool,
  isTransitioning: PropTypes.bool,
  onTransitionEnd: PropTypes.func,
}

FormStatus.defaultProps = {
  progressWidth: 100,
  isValid: false,
  isTransitioning: false,
  onTransitionEnd: () => {},
}

export default FormStatus
