import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'

import i18n from 'util/i18n'

import AnimateReviewIcon from '../AnimateReviewIcon'
import AnimateCheckmarkIcon from '../AnimateCheckmarkIcon'

import connectPackageSection from '../PackageConnector'

const PackageErrors = () => {
  const classes = classnames(
    'submission-status',
    'invalid'
  )

  return (
    <div className={classes}>
      {i18n.m('application.submissionStatus.invalid')}
      <div className="progress-container">
        <div className="review-icon">
          <AnimateReviewIcon valid={false} />
        </div>
        <div className="progress-outline">
          <div className="progress-default">
            <div
              className="progress"
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <div className="icon-container">
          <span className="icon">
            <AnimateCheckmarkIcon valid={false} />
          </span>
        </div>
      </div>

      <div className="invalid-form">
        {i18n.m('application.invalidForm')}
        {/* TODO: ERRORS InvalidSection */}
      </div>
    </div>
  )
}

PackageErrors.propTypes = {
}

export default connectPackageSection(PackageErrors)
