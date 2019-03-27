import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import i18n from 'util/i18n'

import { sectionIsInvalid } from 'helpers/validation'

import FormStatus from '../FormStatus'
import InvalidSection from '../InvalidSection'

import connectPackageSection from '../PackageConnector'

const PackageErrors = ({ formSections }) => {
  const classes = classnames(
    'submission-status',
    'invalid'
  )

  const invalidSections = formSections.filter(s => sectionIsInvalid(s.subsections))

  return (
    <div className={classes}>
      {i18n.m('application.submissionStatus.invalid')}
      <FormStatus
        isValid={false}
        isTransitioning={false}
      />

      <div className="invalid-form">
        {i18n.m('application.invalidForm')}
        {invalidSections.map(s => (
          <InvalidSection key={`package-review-errors-${s.key}`} section={s} />
        ))}
      </div>
    </div>
  )
}

PackageErrors.propTypes = {
  formSections: PropTypes.array,
}

PackageErrors.defaultProps = {
  formSections: [],
}

export default connectPackageSection(PackageErrors)
