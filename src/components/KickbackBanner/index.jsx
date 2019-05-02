import React from 'react'
import { i18n } from 'config'

const KickbackBanner = () => (
  <div className="usa-alert usa-alert-warning kickback-banner">
    <div className="usa-alert-body kickback-banner__wrapper">
      <span className="fa fa-exclamation-triangle kickback-banner__exclamation" />
      <p className="usa-alert-text kickback-banner__text">{i18n.t('review.kickbackMessage')}</p>
    </div>
  </div>
)

export default KickbackBanner
