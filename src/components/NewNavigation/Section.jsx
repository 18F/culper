import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import SectionList from './SectionList'

class Section extends React.Component {
  render () {
    let url = `${this.props.baseUrl}/${this.props.section.url}`

    const subsections = this.props.section.subsections
    let sectionList
    if (subsections) {
      sectionList = <SectionList className="usa-sidenav-sub_list" baseUrl={url} sections={subsections}/>
      // the section heading should link to the first subsection
      url += `/${subsections[0].url}`
    }

    return (
      <li key={url}>
        <NavLink to={url} activeClassName="usa-current">{this.props.section.name}</NavLink>
        {sectionList}
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
