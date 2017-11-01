import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'
import { navigation, env } from '../../config'
import { validations, isActive, isValid, hasErrors } from '../../validators/navigation'
import { ToggleItem } from './ToggleItem'

class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: navigation[0].name
    }

    this.onToggle = this.onToggle.bind(this)
  }

  onToggle (item) {
    this.setState({ selected: item.visible ? item.title : '' })
  }

  /**
   * Get the classes to be applied to a link. This includes the following:
   *  - active
   *  - has-errors
   *  - is-valid
   */
  getClassName (route, pathname) {
    let klass = ''

    if (isActive(route, pathname)) {
      klass += ' active'
    }

    if (hasErrors(route, this.props)) {
      klass += ' has-errors'
    } else if (isValid(route, this.props)) {
      klass += ' is-valid'
    }

    return klass
  }

  subsectionWalker (section, url) {
    if (!section.subsections) {
      return null
    }

    const pathname = this.props.location().pathname

    return section.subsections.map(subsection => {
      if (subsection.hidden) {
        return ''
      }

      if (subsection.hiddenFunc && subsection.hiddenFunc(this.props.application)) {
        return ''
      }

      const subUrl = `${url}/${subsection.url}`
      const subClass = this.getClassName(subUrl, pathname)

      // Collapsed state properties
      if (subsection.subsections) {
        return (
          <ToggleItem title={subsection.name}
                      section={false}
                      className={subClass}
                      visible={isActive(subUrl, pathname)}>
            {this.subsectionWalker(subsection, subUrl)}
          </ToggleItem>
        )
      }

      return (
        <div key={subsection.name} className="subsection" >
          <Link to={subUrl} className={subClass}>
            <span className="section-name">
              {subsection.name}
            </span>
            <span className="mini eapp-status-icon-valid"></span>
            <span className="mini eapp-status-icon-error"></span>
          </Link>
        </div>
      )
    })
  }

  render () {
    const pathname = this.props.location().pathname
    let sectionNum = 0

    const nav = navigation.map((section) => {
      if (section.hidden) {
        return ''
      }

      if (section.hiddenFunc && section.hiddenFunc(this.props.application)) {
        return ''
      }

      const url = `/form/${section.url}`
      const sectionClass = this.getClassName(url, pathname)

      // Increment the section number
      sectionNum++

      // Collapsed state properties
      if (section.subsections) {
        const visible = this.state.selected === section.name
        return (
          <ToggleItem title={section.name}
                      section={true}
                      number={sectionNum}
                      className={sectionClass}
                      visible={visible}
                      onToggle={this.onToggle}>
            {this.subsectionWalker(section, url)}
          </ToggleItem>
        )
      }

      return (
        <div key={section.name} className="section">
          <span className="section-title">
            <Link to={url} className={sectionClass}>
              <span className="section-number">{section.showNumber && sectionNum}</span>
              <span className="section-name">
                {section.name}
              </span>
              <span className="eapp-status-icon-valid"></span>
              <span className="eapp-status-icon-error"></span>
            </Link>
          </span>
        </div>
      )
    })

    return (
      <div className="form-navigation">
        {nav}
      </div>
    )
  }
}

Navigation.defaultProps = {
  location: () => { return env.History().getCurrentLocation() }
}

function mapStateToProps (state) {
  const section = state.section || {}
  const app = state.application || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}

  return {
    application: app,
    section: section,
    errors: errors,
    completed: completed
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Navigation))
