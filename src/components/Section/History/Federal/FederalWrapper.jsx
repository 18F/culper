import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'util/i18n'

import ConnectedFederal from './Federal'

const FederalWrapper = ({ inReview }) => (
  <div>
    <h1 className="section-header">
      {i18n.t('history.destination.federal')}
    </h1>

    <ConnectedFederal required={inReview} />
  </div>
)

FederalWrapper.propTypes = {
  inReview: PropTypes.bool,
}

FederalWrapper.defaultProps = {
  inReview: false,
}

export default FederalWrapper
