import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ApplicantName from './ApplicantName'
import ApplicantBirthDate from './ApplicantBirthDate'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantSSN from './ApplicantSSN'

// Mapping section identifiers to the associated components.
const sectionMap = {
  'name': () => { return (<ApplicantName />) },
  'birthdate': () => { return (<ApplicantBirthDate />) },
  'birthplace': () => { return (<ApplicantBirthPlace />) },
  'ssn': () => { return (<ApplicantSSN />) }
}

class Identification extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  handleTour (event) {
    this.setState({ subsection: 'name' })
  }

  handleReview (event) {
    this.setState({ subsection: 'review' })
  }

  render () {
    if (!this.state.subsection) {
      return (
        <div className="identification">
          <div id="titles" className="usa-grid-full">
            <div className="usa-width-one-half">
              <h3>One piece at a time</h3>
            </div>
            <div className="usa-width-one-half">
              <h3>Full section view</h3>
            </div>
          </div>

          <div id="dialogs" className="usa-grid-full">
            <div className="usa-width-one-half">
              <p>Take a guided tour through the section</p>
            </div>
            <div className="usa-width-one-half">
              <p>View all the sections associated with <strong>Identification</strong> at once</p>
            </div>
          </div>

          <div id="actions" className="usa-grid-full">
            <div className="usa-width-one-half">
              <button onClick={this.handleTour}>Take me on the tour!</button>
            </div>
            <div className="usa-width-one-half">
              <button onClick={this.handleReview}>Show me the full section</button>
            </div>
          </div>
        </div>
      )
    }

    if (this.state.subsection === 'review') {
      return (
        <div className="identification">
          <ApplicantName />
          <ApplicantBirthDate />
          <ApplicantBirthPlace />
          <ApplicantSSN />
        </div>
      )
    }

    return (
      <div className="identification">
        {sectionMap[this.state.subsection]()}
      </div>
    )
  }
}

export default AuthenticatedView(Identification)
