import React from 'react'

const KickbackBanner = () => (
  <div className="usa-alert usa-alert-warning kickback-banner">
    <div className="usa-alert-body kickback-banner__wrapper">
      <span className="fa fa-exclamation-triangle kickback-banner__exclamation" />
      <p className="usa-alert-text kickback-banner__text">Your application needs further edits after review by your agency representative. Please address their comments found in the email provided. Some yes/no questions have also been cleared, please provide your most current answers to these questions to ensure your application is accurate to the present time.</p>
    </div>
  </div>
)

export default KickbackBanner
