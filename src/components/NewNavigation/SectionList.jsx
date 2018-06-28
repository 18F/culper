import React from 'react'
import PropTypes from 'prop-types'
import Section from './Section'

class SectionList extends React.Component {
  render () {
    const navItems = this.props.sections.map((section) => {
      return <Section key={section.url} baseUrl={this.props.baseUrl} section={section}/>
    })

    return (
      <ul className={this.props.className}>
        {navItems}
      </ul>
    )
  }
}


SectionList.propTypes = {
  baseUrl: PropTypes.string,
  className: PropTypes.string,
  sections: PropTypes.array.isRequired
}

SectionList.defaultProps = {
  baseUrl: '/form',
  className: 'usa-sidenav-list'
}

export default SectionList
