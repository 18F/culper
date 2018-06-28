import React from 'react'
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

  isActive (match, location) {
    // match exact or child paths
    return !!match || location.pathname.startsWith(this.url())
  }

  render () {
    const subsections = this.props.section.subsections
    let sectionBaseUrl = this.url()
    let navUrl = sectionBaseUrl
    if (subsections) {
      // link to the first subsection
      navUrl += `/${subsections[0].url}`
    }

    return (
      <li>
        <NavLink to={navUrl} activeClassName="usa-current" isActive={this.isActive}>
          {this.props.section.name}
          <Show when={subsections}>
            <i className="fa fa-angle-up" aria-hidden="true"></i>
            <i className="fa fa-angle-down" aria-hidden="true"></i>
          </Show>
        </NavLink>
        <Show when={subsections}>
          <SectionList className="usa-sidenav-sub_list" baseUrl={sectionBaseUrl} sections={subsections || []} />
        </Show>
      </li>
    )
  }
}

Section.propTypes = {
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

export default Section
