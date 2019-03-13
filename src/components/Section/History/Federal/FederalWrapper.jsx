import React from 'react'

import i18n from 'util/i18n'

import ConnectedFederal from './Federal'

const FederalWrapper = () => (
  <div>
    <h1 className="section-header">
      {i18n.t('history.destination.federal')}
    </h1>

    <ConnectedFederal />
  </div>
)

export default FederalWrapper
