import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'
import { updateSection } from '../../actions/SectionActions'
import { navigation, env } from '../../config'
import { isActive, isValid, hasErrors } from './navigation-helpers'
import { ToggleItem } from './ToggleItem'

class Navigation extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: navigation[0].name
    }

    this.clicked = this.clicked.bind(this)
    this.onToggle = this.onToggle.bind(this)
    this.location = null
    this.uselocation = true
  }

  componentDidMount() {
    this.unlisten = this.props.history().listen((location, action) => {
      this.uselocation = true
      this.location = location.pathname
    })
  }

  componentUnmount () {
    this.unlisten()
  }

  onToggle (item) {
    this.uselocation = false
    this.setState({ selected: item.visible ? item.title : '' })
  }

  clicked (url, event) {
    const parts = (url || '').replace('/form/', '').split('/')
    const section = parts.shift()
    const subsection = parts.join('/') || 'intro'
    this.props.dispatch(updateSection(section, subsection))
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

    const subsections = section.subsections.map(subsection => {
      if (subsection.hidden) {
        return ''
      }

      if (subsection.hiddenFunc && subsection.hiddenFunc(this.props.application)) {
        return ''
      }

      const subUrl = `${url}/${subsection.url}`
      const subClass = this.getClassName(subUrl, pathname)

      // If the section is locked then the navigation item is displayed but
      // nothing else.
      const locked = subsection.locked && subsection.locked(this.props.application)
      if (locked) {
        return (
          <div key={subsection.name} className="subsection">
            <a href="javascript:;;;" className={`${subClass} locked`}>
              <span className="section-name">
                {subsection.name}
              </span>
              <span className="mini eapp-status-icon-valid"></span>
              <span className="mini eapp-status-icon-error"></span>
            </a>
          </div>
        )
      }

      // Collapsed state properties
      if (subsection.subsections) {
        return (
          <ToggleItem title={subsection.name}
                      key={subUrl}
                      section={false}
                      className={subClass}
                      visible={isActive(subUrl, pathname)}>
            {this.subsectionWalker(subsection, subUrl)}
          </ToggleItem>
        )
      }

      return (
        <div key={subsection.name} className="subsection">
          <Link to={subUrl} className={subClass} onClick={this.clicked.bind(this, subUrl)}>
            <span className="section-name">
              {subsection.name}
            </span>
            <span className="mini eapp-status-icon-valid"></span>
            <span className="mini eapp-status-icon-error"></span>
          </Link>
        </div>
      )
    })

    return (
      <div key={`top-${url}`}>
        {subsections}
      </div>
    )
  }

  render () {
    const pathname = this.props.location().pathname
    let sectionNum = 0

    const nav = navigation.map((section) => {
      if (section.hidden) {
        return null
      }

      if (section.hiddenFunc && section.hiddenFunc(this.props.application)) {
        return null
      }

      const url = `/form/${section.url}`
      const sectionClass = this.getClassName(url, pathname)

      // Increment the section number
      sectionNum++

      // If the section is locked then the navigation item is displayed but
      // nothing else.
      const locked = section.locked && section.locked(this.props.application)
      if (locked) {
        return (
          <div key={section.name} className="section">
            <span className="section-title">
              <a href="javascript:;;;" className={`${sectionClass} locked`}>
                <span className="section-number">{section.showNumber ? sectionNum : ''}</span>
                <span className="section-name">
                  {section.name}
                </span>
                <span className="eapp-status-icon-valid"></span>
                <span className="eapp-status-icon-error"></span>
              </a>
            </span>
          </div>
        )
      }

      // Collapsed state properties
      if (section.subsections) {
        const visible = this.uselocation
              ? isActive(url, this.location || '')
              : this.state.selected === section.name
        return (
          <ToggleItem title={section.name}
                      key={url}
                      section={true}
                      number={section.showNumber ? sectionNum : null}
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
            <Link to={url} className={sectionClass} onClick={this.clicked.bind(this, url)}>
              <span className="section-number">{section.showNumber ? sectionNum : ''}</span>
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
      <nav className="form-navigation" role="navigation">
        {nav.filter(x => !!x)}
      </nav>
    )
  }
}

Navigation.defaultProps = {
  history: () => {
    return env.History()
  },
  location: () => {
    return env.History().location
  }
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
