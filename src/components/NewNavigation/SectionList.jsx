import React from 'react'
import PropTypes from 'prop-types'
import AuthenticatedView from '../../views/AuthenticatedView'
import Section from './Section'

class SectionList extends React.Component {
  render () {
    const navItems = this.props.sections.map((section) => {
      return <Section key={section.url} section={section}/>
    })

    return (
      <ul className={this.props.className}>
        {navItems}
      </ul>
    )
  }
}


SectionList.propTypes = {
  className: PropTypes.string,
  sections: PropTypes.array.isRequired
}

SectionList.defaultProps = {
  className: 'usa-sidenav-list'
}

export default AuthenticatedView(SectionList)
