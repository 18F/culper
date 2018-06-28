import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'
import { navigation, env } from '../../config'
import { isActive, isValid, hasErrors } from './navigation-helpers'
import Section from './Section'
import { ToggleItem } from './ToggleItem'

class Navigation extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: navigation[0].name
    }

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

    if (hasErrors(route, this.props.errors)) {
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
          <Section key={subsection.name}
            isSubSection={true}
            locked={true}
            name={subsection.name}
            subUrl={subUrl}
            sectionClass={subClass}/>
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
        <Section key={subsection.name}
          isSubSection={true}
          name={subsection.name}
          subUrl={subUrl}
          sectionClass={subClass}/>
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

      const displayNum = section.showNumber ? sectionNum : null

      // If the section is locked then the navigation item is displayed but
      // nothing else.
      const locked = section.locked && section.locked(this.props.application)
      if (locked) {
        return (
          <Section key={section.name}
            name={section.name}
            sectionClass={sectionClass}
            sectionNum={displayNum}
            locked={true}/>
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
                      number={displayNum}
                      className={sectionClass}
                      visible={visible}
                      onToggle={this.onToggle}>
            {this.subsectionWalker(section, url)}
          </ToggleItem>
        )
      }

      return (
        <Section key={section.name}
          name={section.name}
          sectionClass={sectionClass}
          sectionNum={displayNum}/>
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
  const application = state.application || {}
  const errors = application.Errors || {}
  const completed = application.Completed || {}

  return {
    application,
    section,
    errors,
    completed
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Navigation))
