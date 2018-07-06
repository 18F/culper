import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { hasErrors, isValid } from '../Navigation/navigation-helpers'

class Section extends React.Component {
  url () {
    return `${this.props.baseUrl}/${this.props.section.url}`
  }

  hasErrors () {
    return hasErrors(this.url(), this.props.errors)
  }

  isValid () {
    return isValid(this.url(), this.props)
  }

  getClassName () {
    let className = 'section-link'
    if (this.hasErrors()) {
      className += ' has-errors'
    } else if (this.isValid()) {
      className += ' is-valid'
    }
    return className
  }

  render () {
    return (
      <li>
        <NavLink to={this.url()} activeClassName="usa-current" className={this.getClassName()}>
          <span className="section-name">
            {this.props.section.name}
          </span>
          <span className="eapp-status-icon"></span>
        </NavLink>
      </li>
    )
  }
}

Section.propTypes = {
  baseUrl: PropTypes.string,
  completed: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
}

Section.defaultProps = {
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

export default connect(mapStateToProps)(Section)
