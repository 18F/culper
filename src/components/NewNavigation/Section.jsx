import React from 'react'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import SectionList from './SectionList'
import Show from '../Form/Show'

class Section extends React.Component {
  constructor (props) {
    super(props)
    this.isActive = this.isActive.bind(this)
  }

  url () {
    return `${this.props.baseUrl}/${this.props.section.url}`
  }

  // Return `true` when at this exact section or one under it, `false` otherwise.
  isActive () {
    // Using `location` from `withRouter()` rather than the `NavLink` callback parameter because we want to be able to use this function in other contexts.
    return this.props.location.pathname.startsWith(this.url())
  }

  render () {
    const subsections = this.props.section.subsections
    let sectionBaseUrl = this.url()
    const isActive = this.isActive()

    let navUrl = sectionBaseUrl
    if (subsections) {
      // link to the first subsection
      navUrl += `/${subsections[0].url}`
    }

    return (
      <li>
        <NavLink to={navUrl} activeClassName="usa-current" isActive={this.isActive}>
          {this.props.section.name}
          <Show when={subsections && !isActive}>
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          </Show>
        </NavLink>
        <Show when={subsections && isActive}>
          <SectionList className="usa-sidenav-sub_list" baseUrl={sectionBaseUrl} sections={subsections || []} />
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
  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    subsections: PropTypes.array
  }).isRequired
}

Section.defaultProps = {
  baseUrl: '/form'
}

export default withRouter(Section)
