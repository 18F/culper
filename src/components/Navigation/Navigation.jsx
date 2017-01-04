import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import AuthenticatedView from '../../views/AuthenticatedView'

class Navigation extends React.Component {

  render () {
    let sectionNum = 0
    let nav = sectionNavMap.map((section) => {
      const url = `/form/${section.url}`
      sectionNum++
      return (
        <div key={section.name} className="section">
          <span className="title">
            <Link to={url} activeClassName="active"><span className="number">{sectionNum}</span> {section.name}</Link>
          </span>
          {
            section.subsections.map(subsection => {
              const secUrl = `/form/${section.url}/${subsection.url}`
              return (
                <div key={subsection.name} className="subsection" >
                  <Link to={secUrl} activeClassName="active">{subsection.name}</Link>
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
      { name: 'Name', url: 'name' },
      { name: 'Maiden Name', url: 'maidenname' },
      { name: 'Dates Used', url: 'datesused' },
      { name: 'Reasons', url: 'reasons' }
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
export default AuthenticatedView(Navigation)
