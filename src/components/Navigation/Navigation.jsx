import React from 'react'
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'
import { navigation } from '../../config'

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
   *  error => identification.name.*
   */
  hasErrors (route, pathname) {
    let crumbs = route.replace('/form/', '').split('/')
    let error = crumbs[0]
    if (crumbs.length > 1) {
      error += '.' + crumbs[1] + '.'
    }

    let count = 0
    for (let section in this.props.errors) {
      if (section.toLowerCase() !== crumbs[0].toLowerCase()) {
        continue
      }

      this.props.errors[section].forEach((e) => {
        if (e.indexOf(error) === 0) {
          count++
        }
      })
    }

    return count > 0
  }

  /**
   * Determine if the route is considered complete and valid
   */
  isValid (route, pathname) {
    let crumbs = route.replace('/form/', '').split('/')

    for (let section in this.props.completed) {
      if (section !== crumbs[0]) {
        continue
      }

      if (crumbs.length === 1) {
        return this.props.completed[section].status === 'complete'
      }
    }

    return false
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

  getIcon (klass) {
    if (klass.indexOf('is-valid') > -1) {
      return <i className="fa fa-check-circle"></i>
    } else if (klass.indexOf('has-errors') > -1) {
      return <i className="fa fa-exclamation-circle"></i>
    }
    return ''
  }

  render () {
    let location = hashHistory.getCurrentLocation()
    let pathname = location.pathname
    let sectionNum = 0
    let nav = navigation.map((section) => {
      if (section.hidden) {
        return ''
      }

      const url = `/form/${section.url}`
      const sectionClass = this.getClassName(url, pathname)
      const sectionIcon = this.getIcon(sectionClass)
      const subsections = section.subsections.map(subsection => {
        if (subsection.hidden) {
          return ''
        }

        const subUrl = `/form/${section.url}/${subsection.url}`
        const subClass = this.getClassName(subUrl, pathname)
        const subIcon = this.getIcon(subClass)
        return (
          <div key={subsection.name} className="subsection" >
            <Link to={subUrl} className={subClass}>
              {subIcon}
              <span className="name">{subsection.name}</span>
              <span className="eapp-status-icon-error"></span>
            </Link>
          </div>
        )
      })

      // Increment the section number
      sectionNum++

      return (
        <div key={section.name} className="section">
          <span className="title">
            <Link to={url} className={sectionClass}>
              {sectionIcon}
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
    section: section,
    errors: errors,
    completed: completed
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Navigation))
