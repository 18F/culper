import React from 'react'
import PropTypes from 'prop-types'
import Section from './Section'

class SectionList extends React.Component {
  render () {
    const className = `usa-accordion ${this.props.className}`
    const navItems = this.props.sections.map((section) => {
      return <Section key={section.url} baseUrl={this.props.baseUrl} section={section}/>
    })

    return (
      <ol className={className}>
        {navItems}
      </ol>
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
