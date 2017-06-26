import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'
import { navigation, env } from '../../config'

class Navigation extends React.Component {
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

    const location = env.History().getCurrentLocation()
    const pathname = location.pathname

    return section.subsections.map(subsection => {
      if (subsection.hidden) {
        return ''
      }

      if (subsection.hiddenFunc && subsection.hiddenFunc(this.props.application)) {
        return ''
      }

      const subUrl = `${url}/${subsection.url}`
      const subClass = this.getClassName(subUrl, pathname)
      const childSubsections = isActive(subUrl, pathname) && section.subsections
            ? this.subsectionWalker(subsection, subUrl)
            : []

      return (
        <div key={subsection.name} className="subsection" >
          <Link to={subUrl} className={subClass}>
            <span className="name">{subsection.name}</span>
            <span className="mini eapp-status-icon-valid"></span>
            <span className="mini eapp-status-icon-error"></span>
          </Link>
          { childSubsections }
        </div>
      )
    })
  }

  render () {
    const location = env.History().getCurrentLocation()
    const pathname = location.pathname
    let sectionNum = 0

    const nav = navigation.map((section) => {
      if (section.hidden) {
        return ''
      }

      const url = `/form/${section.url}`
      const sectionClass = this.getClassName(url, pathname)
      const subsections = isActive(url, pathname)
            ? this.subsectionWalker(section, url)
            : []

      // Increment the section number
      sectionNum++

      return (
        <div key={section.name} className="section">
          <span className="title">
            <Link to={url} className={sectionClass}>
              <span className="number">{sectionNum}</span>
              <span className="name">{section.name}</span>
              <span className="eapp-status-icon-valid"></span>
              <span className="eapp-status-icon-error"></span>
            </Link>
          </span>
          { subsections }
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

export const validations = (section, props = {}) => {
  if (!section.subsections) {
    return 1
  }

  return section.subsections
    .filter(subsection => {
      if (subsection.hidden || (subsection.hiddenFunc && subsection.hiddenFunc(props.application))) {
        return false
      }

      return true
    })
    .reduce((count, subsection) => {
      return count + validations(subsection, props)
    }, 0)
}

/**
 * Determine if the route has any errors
 *
 * example:
 *  route => /form/identification/name
 */
export const hasErrors = (route, props = {}) => {
  const crumbs = route.replace('/form/', '').split('/')

  for (const section in props.errors) {
    if (section.toLowerCase() !== crumbs[0].toLowerCase()) {
      continue
    }

    const se = props.errors[section]
    if (crumbs.length === 1) {
      return se.some(e =>
                     e.section.toLowerCase() === crumbs[0].toLowerCase() &&
                     e.valid === false)
    } else if (crumbs.length > 1) {
      return se.some(e =>
                     e.section.toLowerCase() === crumbs[0].toLowerCase() &&
                     e.subsection.toLowerCase().indexOf(crumbs.slice(1, crumbs.length).join('/').toLowerCase()) === 0 &&
                     e.valid === false)
    }
  }

  return false
}

/**
 * Determine if the route is considered complete and valid
 */
export const isValid = (route, props = {}) => {
  const crumbs = route.replace('/form/', '').split('/')

  // Find which node we should be checking against
  let node = null
  for (const crumb of crumbs) {
    if (!node) {
      node = navigation.find(x => x.url.toLowerCase() === crumb.toLowerCase())
    } else if (node.subsections) {
      node = node.subsections.find(x => x.url.toLowerCase() === crumb.toLowerCase())
    }
  }

  for (const section in props.completed) {
    if (section.toLowerCase() !== crumbs[0].toLowerCase()) {
      continue
    }

    let completedSections = props.completed[section].filter(e => e.section.toLowerCase() === crumbs[0].toLowerCase())
    if (crumbs.length > 1) {
      completedSections = completedSections.filter(e => e.subsection.toLowerCase().indexOf(crumbs.slice(1, crumbs.length).join('/').toLowerCase()) === 0)
    }

    return completedSections.filter(e => e.valid === true).length >= validations(node, props)
  }

  return false
}

/**
 * There is a bug in the react router which does not add the active
 * class to items in the route hiearchy
 */
export const isActive = (route, pathname) => {
  return pathname.indexOf(route) !== -1
}
