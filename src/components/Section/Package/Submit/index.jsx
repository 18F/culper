import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'

import i18n from 'util/i18n'

import FormStatus from '../FormStatus'

import connectPackageSection from '../PackageConnector'

const PackageSubmit = () => {
  const classes = classnames(
    'submission-status',
    'valid'
  )

  return (
    <div className={classes}>
      {i18n.m('application.submissionStatus.valid')}
      <FormStatus
        isValid
        isTransitioning={false}
      />

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

export default connectPackageSection(PackageSubmit)
