import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import SectionList from './SectionList'
import { hasErrors, isActive, isValid } from '../Navigation/navigation-helpers'

class ToggleItem extends React.Component {
  url() {
    return `${this.props.baseUrl}/${this.props.section.url}`
  }

  isActive() {
    return isActive(this.url(), this.props.location.pathname)
  }

  hasErrors() {
    return hasErrors(this.url(), this.props.errors)
  }

  isValid() {
    return isValid(this.url(), this.props)
  }

  getClassName() {
    let className = 'section-link usa-accordion-button'

    if (this.isActive()) {
      className += ' usa-current'
    }

    if (this.hasErrors()) {
      className += ' has-errors'
    } else if (this.isValid()) {
      className += ' is-valid'
    }
    return className
  }

  render() {
    const url = this.url()
    const active = this.isActive()

    return (
      <li className="toggle-item">
        <a className={this.getClassName()} aria-controls={url} aria-expanded={active} role="button">
          <span className="section-name">
            {this.props.section.name}
          </span>
          <span className="eapp-status-icon"></span>
        </a>
        <div id={url} className="usa-accordion-content" aria-hidden={!active}>
          <SectionList className="usa-sidenav-sub_list" baseUrl={url} sections={this.props.section.subsections}/>
        </div>
      </li>
    )
  }
}

ToggleItem.propTypes = {
  // from withRouter()
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,

  baseUrl: PropTypes.string,
  completed: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    subsections: PropTypes.array.isRequired
  }).isRequired
}

ToggleItem.defaultProps = {
  baseUrl: '/form',
  completed: {},
  errors: {}
}

function mapStateToProps(state) {
  const app = state.application || {}
  const completed = app.Completed || {}
  const errors = app.Errors || {}
  return {
    completed,
    errors
  }
}

export default withRouter(connect(mapStateToProps)(ToggleItem))
