import React from 'react'
import PropTypes from 'prop-types'

import { DateSummary } from 'components/Summary'

/**
 * Renders a formatted gap row
 */
export const Gap = ({
  dates,
  title,
  para,
  onClick,
  btnText,
}) => {
  if (!dates.from || !dates.to) {
    return null
  }

  const dateSummary = DateSummary(dates)

  return (
    <div className="gap details open">
      <div className="usa-alert usa-alert-error" role="alert">
        <div className="usa-alert-body">
          <h5 className="usa-alert-heading">
            {`${title} - `}
            <span className="dates">{dateSummary}</span>
          </h5>

          <p>{para}</p>

          <button type="button" className="usa-button-outline" onClick={onClick}>
            <span>{btnText}</span>
            <i className="fa fa-plus-circle" />
          </button>
        </div>
      </div>
    </div>
  )
}

Gap.propTypes = {
  dates: PropTypes.object,
  title: PropTypes.node,
  para: PropTypes.node,
  btnText: PropTypes.node,
  onClick: PropTypes.func,
}

Gap.defaultProps = {
  title: '',
  btnText: '',
  para: '',
  dates: {
    from: null,
    to: null,
  },
  onClick: () => {},
}

export default Gap
