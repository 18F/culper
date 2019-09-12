/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'

import { DateSummary } from 'components/Summary'

/**
 * Renders a formatted gap row
 */
export const Gap = ({
  title,
  para,
  gaps,
}) => {
  if (!gaps || !gaps.length) {
    return null
  }

  return (
    <div className="gap details open">
      <div className="usa-alert usa-alert-error" role="alert">
        <div className="usa-alert-body">
          <h5 className="usa-alert-heading">
            {title}
          </h5>

          <p>{para}</p>

          <ul>
            {gaps.map((g, i) => (
              <li key={i}>
                {DateSummary(g)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

Gap.propTypes = {
  title: PropTypes.node,
  para: PropTypes.node,
  gaps: PropTypes.array,
}

Gap.defaultProps = {
  title: '',
  para: '',
  gaps: [],
}

export default Gap
