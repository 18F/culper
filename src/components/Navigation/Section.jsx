import React from 'react'
import PropTypes from 'prop-types'
import SectionLink from './SectionLink';
import ToggleItem from './ToggleItem';

class Section extends React.Component {
  render () {
    const section = this.props.section
    if (section.subsections) {
      return <ToggleItem baseUrl={this.props.baseUrl} section={section}/>
    }
    return <SectionLink baseUrl={this.props.baseUrl} section={section}/>
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
