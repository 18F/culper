import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

// Using the SF86 since it is a superset of all form sections. This could be improved on.
import { FLAT_SF86 } from 'config/formTypes'

/**
 * Takes an array of breadcrumbs and formats it in to a pretty trail
 */
/* eslint react/no-array-index-key: 0 */
const trail = crumbs => (
  crumbs.map((crumb, i, arr) => {
    if (arr.length === i + 1) {
      return (
        <span key={`crumb-${i}`} className="title-text">
          {crumb}
        </span>
      )
    }

    return (
      <span key={`crumb-${i}`} className="crumb">
        {crumb}
        {' '}
        &gt;
        {' '}
      </span>
    )
  })
)

const SectionTitle = ({ location }) => {
  const formSection = FLAT_SF86.find(s => s.fullPath === location.pathname)

  if (!formSection || !formSection.breadcrumbs) {
    return null
  }

  const title = trail(formSection.breadcrumbs)
  return <h1 className="title">{title}</h1>
}

SectionTitle.propTypes = {
  location: PropTypes.object.isRequired,
}

export default withRouter(SectionTitle)
