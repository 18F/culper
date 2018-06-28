import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import SectionList from './SectionList'

class Section extends React.Component {
  render () {
    const url = `${this.props.baseUrl}/${this.props.section.url}`

    let subsections
    if (this.props.section.subsections) {
      subsections = <SectionList className="usa-sidenav-sub_list" baseUrl={url} sections={this.props.section.subsections}/>
    }

    return (
      <li key={url}>
        <NavLink to={url} activeClassName="usa-current">{this.props.section.name}</NavLink>
        {subsections}
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
