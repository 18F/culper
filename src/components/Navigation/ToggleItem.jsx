import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import SectionList from './SectionList'
import Show from '../Form/Show'
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
    const active = this.isActive()

    return (
      <li>
        <a className={this.getClassName()} aria-controls={this.url()} aria-expanded="false" onClick={this.toggle}>
          <span className="section-name">
            {this.props.section.name}
            <i className="fa fa-angle-up"></i>
            <i className="fa fa-angle-down"></i>
          </span>
          <span className="eapp-status-icon"></span>
        </a>
        <div id={this.url()} className="usa-accordion-content">
          <SectionList className="usa-sidenav-sub_list" baseUrl={this.url()} sections={this.props.section.subsections}/>
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
