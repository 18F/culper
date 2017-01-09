import React from 'react'
import { Link, hashHistory } from 'react-router'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'

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
   */
  hasErrors (route, pathname) {
    // TODO: Pull this from true error state
    return route.indexOf('birth') !== -1
  }

  /**
   * Determine if the route is considered complete and valid
   */
  isValid (route, pathname) {
    // TODO: Pull this from true error state
    return route.indexOf('ssn') !== -1
  }

  /**
   * Get the classes to be applied to a link. This includes the following:
   *  - active
   *  - has-errors
   *  - is-valid
   */
  getClassName (route) {
    let location = hashHistory.getCurrentLocation()
    let pathname = location.pathname
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

  render () {
    let sectionNum = 0
    let nav = sectionNavMap.map((section) => {
      const url = `/form/${section.url}`
      sectionNum++
      return (
        <div key={section.name} className="section">
          <span className="title">
            <Link to={url} className={this.getClassName(url)}>
              <span className="number">{sectionNum}</span> {section.name}
            </Link>
          </span>
          {
            section.subsections.map(subsection => {
              const secUrl = `/form/${section.url}/${subsection.url}`
              return (
                <div key={subsection.name} className="subsection" >
                  <Link to={secUrl} className={this.getClassName(secUrl)}>{subsection.name}</Link>
                </div>
              )
            })
          }
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

const sectionNavMap = [
  {
    name: 'Identification',
    url: 'identification',
    subsections: [
      { name: 'Name', url: 'name' },
      { name: 'Birth Date', url: 'birthdate' },
      { name: 'Birth Place', url: 'birthplace' },
      { name: 'Social Security Number', url: 'ssn' }
    ]
  },
  {
    name: 'Other Names',
    url: 'othernames',
    subsections: [
      // { name: 'Name', url: 'name' },
      // { name: 'Maiden Name', url: 'maidenname' },
      // { name: 'Dates Used', url: 'datesused' },
      // { name: 'Reasons', url: 'reasons' }
    ]
  },
  {
    name: 'Your Identifying Information',
    url: 'identifying',
    subsections: [
      { name: 'Height', url: 'height' },
      { name: 'Weight', url: 'weight' },
      { name: 'Hair Color', url: 'haircolor' },
      { name: 'Eye Color', url: 'eyecolor' },
      { name: 'Gender', url: 'sex' }
    ]
  }
]

function mapStateToProps (state) {
  // TODO: Grab error states
  let section = state.section || {}
  return {
    section: section
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Navigation))
