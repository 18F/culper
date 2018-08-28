import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { hasErrors, isValid } from '../Navigation/navigation-helpers'

class SectionLink extends React.Component {
  url() {
    return `${this.props.baseUrl}/${this.props.section.url}`
  }

  href() {
    return this.isLocked() ? 'javascript:;;;' : this.url()
  }

  isLocked() {
    return (
      this.props.section.locked &&
      this.props.section.locked(this.props.application)
    )
  }

  hasErrors() {
    if (this.props.section.name === 'Review') {
      return hasErrors(this.props.baseUrl, this.props.errors)
    }
    return hasErrors(this.url(), this.props.errors)
  }

  isValid() {
    return isValid(this.url(), this.props)
  }

  getClassName() {
    let className = 'section-link'

    if (this.isLocked()) {
      className += ' locked'
    }

    if (this.hasErrors()) {
      className += ' has-errors'
    } else if (this.isValid()) {
      className += ' is-valid'
    }
    return className
  }

  render() {
    return (
      <li>
        <NavLink
          to={this.href()}
          activeClassName="usa-current"
          className={this.getClassName()}>
          <span className="section-name">{this.props.section.name}</span>
          <span className="eapp-status-icon" />
        </NavLink>
      </li>
    )
  }
}

SectionLink.propTypes = {
  baseUrl: PropTypes.string,
  application: PropTypes.object.isRequired,
  completed: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  section: PropTypes.shape({
    locked: PropTypes.func,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
}

SectionLink.defaultProps = {
  baseUrl: '/form',
  completed: {},
  errors: {}
}

function mapStateToProps(state) {
  const application = state.application || {}
  const completed = application.Completed || {}
  const errors = application.Errors || {}
  return {
    application,
    completed,
    errors
  }
}

export default connect(mapStateToProps)(SectionLink)
