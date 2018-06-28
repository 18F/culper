import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import SectionList from './SectionList'
import Show from '../Form/Show'
import { hasErrors } from '../Navigation/navigation-helpers'
import { legalTechnologyManipulating } from '../../schema/section';

class Section extends React.Component {
  constructor (props) {
    super(props)
    this.isActive = this.isActive.bind(this)
  }

  url () {
    return `${this.props.baseUrl}/${this.props.section.url}`
  }

  href () {
    const subsections = this.props.section.subsections
    let href = this.url()
    if (subsections) {
      // link to the first subsection
      href += `/${subsections[0].url}`
    }
    return href
  }

  // Return `true` when at this exact section or one under it, `false` otherwise.
  isActive () {
    // Using `location` from `withRouter()` rather than the `NavLink` callback parameter because we want to be able to use this function in other contexts.
    return this.props.location.pathname.startsWith(this.url())
  }

  hasErrors () {
    return hasErrors(this.url(), this.props.errors)
  }

  render () {
    const hasErrors = this.hasErrors()
    const subsections = this.props.section.subsections
    const isActive = this.isActive()
    let className = 'section-link'

    if (hasErrors) {
      className += ' has-errors'
    }

    return (
      <li>
        <NavLink to={this.href()} activeClassName="usa-current" className={className} isActive={this.isActive}>
          <span className="section-name">
            {this.props.section.name}
            <Show when={subsections && !isActive}>
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </Show>
          </span>
          <Show when={!hasErrors}>
            <span className="eapp-status-icon eapp-status-icon-valid"></span>
          </Show>
          <Show when={hasErrors}>
            <span className="eapp-status-icon eapp-status-icon-error"></span>
          </Show>
        </NavLink>
        <Show when={subsections && isActive}>
          <SectionList className="usa-sidenav-sub_list" baseUrl={this.url()} sections={subsections || []} />
        </Show>
      </li>
    )
  }
}

Section.propTypes = {
  // from withRouter
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,

  baseUrl: PropTypes.string,
  errors: PropTypes.object.isRequired,
  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    subsections: PropTypes.array
  }).isRequired
}

Section.defaultProps = {
  baseUrl: '/form',
  errors: {}
}

function mapStateToProps(state) {
  const app = state.application || {}
  const errors = app.Errors || {}
  return { errors }
}

export default withRouter(connect(mapStateToProps)(Section))
