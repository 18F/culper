import React from 'react'

import { i18n } from '@config'

import Federal from './Federal'

class FederalWrapper extends React.Component {
  render () {
    return (
      <div>
        <h1 className="section-header">
          {i18n.t('history.destination.federal')}
        </h1>

        <Federal />
      </div>
    )
  }
}

export default FederalWrapper
