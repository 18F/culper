import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import SectionList from './SectionList'
import Show from '../Form/Show'
import { hasErrors, isActive, isValid } from '../Navigation/navigation-helpers'

class ToggleItem extends React.Component {
  constructor(props) {
    super(props)
    this.isActive = this.isActive.bind(this)
  }

  url() {
    return `${this.props.baseUrl}/${this.props.section.url}`
  }

  href() {
    const subsection = this.props.section.subsections[0]
    // link to the first subsection
    return `${this.url()}/${ subsection.url }`
  }

  isActive() {
    // Using `location` from `withRouter()` rather than the `NavLink` callback parameter because we want to be able to use this function in other contexts.
    return isActive(this.url(), this.props.location.pathname)
  }

  hasErrors() {
    return hasErrors(this.url(), this.props.errors)
  }

  isValid() {
    return isValid(this.url(), this.props)
  }

  getClassName() {
    let className = 'section-link'
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
        <NavLink to={this.href()} activeClassName="usa-current" className={this.getClassName()} isActive={this.isActive}>
          <span className="section-name">
            {this.props.section.name}
            <Show when={!active}>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </Show>
          </span>
          <span className="eapp-status-icon"></span>
        </NavLink>
        <Show when={active}>
          <SectionList className="usa-sidenav-sub_list" baseUrl={this.url()} sections={this.props.section.subsections}/>
        </Show>
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
