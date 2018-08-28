import React from 'react'
import PropTypes from 'prop-types'
import SectionLink from './SectionLink'
import ToggleItem from './ToggleItem'

class SectionList extends React.Component {
  render() {
    const className = `usa-accordion ${this.props.className}`
    const navItems = this.props.sections.map(section => {
      if (section.subsections) {
        return (
          <ToggleItem
            key={section.url}
            baseUrl={this.props.baseUrl}
            section={section}
          />
        )
      }
      return (
        <SectionLink
          key={section.url}
          baseUrl={this.props.baseUrl}
          section={section}
        />
      )
    })

    return <ol className={className}>{navItems}</ol>
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
