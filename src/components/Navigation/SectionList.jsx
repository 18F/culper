import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SectionLink from './SectionLink'
import ToggleItem from './ToggleItem'

class SectionList extends React.Component {
  render() {
    const className = `usa-accordion ${this.props.className}`
    const navItems = this.props.sections
      .filter(section => {
        if (
          section.hidden ||
          (section.hiddenFunc && section.hiddenFunc(this.props.application))
        ) {
          return false
        }

        return true
      })
      .map(section => {
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
  application: PropTypes.object.isRequired,
  completed: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  sections: PropTypes.array.isRequired
}

SectionList.defaultProps = {
  baseUrl: '/form',
  className: 'usa-sidenav-list'
}

function mapStateToProps(state) {
  const application = state.application || {}
  const completed = application.Completed || {}
  const errors = application.Errors || {}
  return {
    application,
    completed,
    errors
  }
}

export default connect(mapStateToProps)(SectionList)
