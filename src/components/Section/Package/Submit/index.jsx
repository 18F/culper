import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'

import i18n from 'util/i18n'

import AnimateReviewIcon from '../AnimateReviewIcon'
import AnimateCheckmarkIcon from '../AnimateCheckmarkIcon'

const PackageSubmit = () => {
  const classes = classnames(
    'submission-status',
    'valid'
  )

  return (
    <div className={classes}>
      {i18n.m('application.submissionStatus.valid')}
      <div className="progress-container">
        <div className="review-icon">
          <AnimateReviewIcon valid />
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
            <AnimateCheckmarkIcon valid />
          </span>
        </div>
      </div>
      {/* TODO */}
      {/*
      <ValidForm
          {...releases}
          dispatch={this.props.dispatch}
          onUpdate={this.updateSubmission}
          hideHippa={hideHippa(this.props.Application)}
          submitting={this.state.submitting}
          LegalName={this.props.LegalName}
          onSubmit={this.onSubmit}
          Identification={this.props.Identification}
          History={this.props.History}
        />
       */}
    </div>
  )
}

PackageSubmit.propTypes = {
}

export default PackageSubmit
