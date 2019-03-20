import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import {
  sectionHasErrorsSelector,
  sectionIsValidSelector,
} from 'selectors/navigation'

import SectionList from './SectionList'
import { isActive } from './navigation-helpers'

const ToggleItem = ({
  section, basePath, topSection, location, errors, completed,
}) => {
  const url = `${basePath}/${section.path}`
  const active = isActive(url, location.pathname)

  const newTopSection = topSection || section.name

  const classes = classnames(
    'section-link',
    'usa-accordion-button',
    {
      'usa-current': active,
      'has-errors': errors,
      'is-valid': completed,
    }
  )

  return (
    <li className="toggle-item">
      <button
        type="button"
        className={classes}
        aria-controls={url}
        aria-expanded={active}
      >
        <span className="section-name">{section.label}</span>
        <span className="eapp-status-icon" />
      </button>
      <div id={url} className="usa-accordion-content" aria-hidden={!active}>
        <SectionList
          className="usa-sidenav-sub_list"
          basePath={url}
          topSection={newTopSection}
          sections={section.subsections}
        />
      </div>
    </li>
  )
}

ToggleItem.propTypes = {
  basePath: PropTypes.string,
  topSection: PropTypes.string,
  errors: PropTypes.bool,
  completed: PropTypes.bool,

  // from withRouter()
  location: PropTypes.object,

  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    subsections: PropTypes.array.isRequired,
  }).isRequired,
}

ToggleItem.defaultProps = {
  basePath: '',
  topSection: undefined,
  completed: false,
  errors: false,
  location: {},
}

const mapStateToProps = (state, ownProps) => ({
  ...sectionHasErrorsSelector(state, ownProps),
  ...sectionIsValidSelector(state, ownProps),
})

export default withRouter(connect(mapStateToProps)(ToggleItem))
