import React from 'react'
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'
import { navigation } from '../../config'
import { NavigationValidator } from '../../validators'

class Navigation extends React.Component {
  /**
   * There is a bug in the react router which does not add the active
   * class to items in the route hiearchy
   */
  isActive (route, pathname) {
    return pathname.indexOf(route) !== -1
  }

  /**
   * Determine if the route has any errors
   *
   * example:
   *  route => /form/identification/name
   */
  hasErrors (route, pathname) {
    const crumbs = route.replace('/form/', '').split('/')

    for (const section in this.props.errors) {
      if (section.toLowerCase() !== crumbs[0].toLowerCase()) {
        continue
      }

      const se = this.props.errors[section]
      if (crumbs.length === 1) {
        return se.some(e =>
                       e.section.toLowerCase() === crumbs[0].toLowerCase() &&
                       e.valid === false)
      } else if (crumbs.length > 1) {
        return se.some(e =>
                       e.section.toLowerCase() === crumbs[0].toLowerCase() &&
                       e.subsection.toLowerCase() === crumbs.slice(1, crumbs.length).join('/').toLowerCase() &&
                       e.valid === false)
      }
    }

    return false
  }

  /**
   * Determine if the route is considered complete and valid
   */
  isValid (route, pathname) {
    const crumbs = route.replace('/form/', '').split('/')

    for (const section in this.props.completed) {
      if (section.toLowerCase() !== crumbs[0].toLowerCase()) {
        continue
      }

      const se = this.props.completed[section]
          .filter(e => e.section.toLowerCase() === crumbs[0].toLowerCase())

      if (crumbs.length === 1) {
        return this.countValidations(section) === se.filter(e => e.valid === true).length
      } else if (crumbs.length > 1) {
        const sse = se.filter(e => e.subsection.toLowerCase() === crumbs.slice(1, crumbs.length).join('/').toLowerCase())
        return sse.length > 0 && sse.every(e => e.valid === true)
      }
    }

    return false
  }

  countValidations (section) {
    return navigation.filter(x => x.url === section).reduce((x, y) => {
      return x + y.subsections.length
    }, 0)
  }

  /**
   * Get the classes to be applied to a link. This includes the following:
   *  - active
   *  - has-errors
   *  - is-valid
   */
  getClassName (route, pathname) {
    let klass = ''

    if (this.isActive(route, pathname)) {
      klass += ' active'
    }

    if (this.hasErrors(route, pathname)) {
      klass += ' has-errors'
    } else if (this.isValid(route, pathname)) {
      klass += ' is-valid'
    }

    return klass
  }

  subsectionWalker (section, url) {
    if (!section.subsections) {
      return null
    }

    const location = hashHistory.getCurrentLocation()
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
      let childSubsections = []
      if (section.subsections) {
        childSubsections = this.subsectionWalker(subsection, subUrl)
      }

      return (
        <div key={subsection.name} className="subsection" >
          <Link to={subUrl} className={subClass}>
            <span className="name">{subsection.name}</span>
            <span className="eapp-status-icon-valid"></span>
            <span className="eapp-status-icon-error"></span>
          </Link>
          { childSubsections }
        </div>
      )
    })
  }

  render () {
    const location = hashHistory.getCurrentLocation()
    const pathname = location.pathname
    let sectionNum = 0

    const nav = navigation.map((section) => {
      if (section.hidden) {
        return ''
      }

      const url = `/form/${section.url}`
      const sectionClass = this.getClassName(url, pathname)
      const subsections = this.subsectionWalker(section, url)

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
          { this.isActive(url, pathname) ? subsections : '' }
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
  let section = state.section || {}
  let app = state.application || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    application: app,
    section: section,
    errors: errors,
    completed: completed
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Navigation))
