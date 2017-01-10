import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ApplicantName from '../../Form/Name'
import ApplicantBirthDate from './ApplicantBirthDate'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantSSN from './ApplicantSSN'
import { push } from '../../../middleware/history'
import { updateApplication } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'

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
    this.props.dispatch(push('/form/identification/name'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/identification/review'))
  }

  onUpdate (field, values) {
    this.props.dispatch(updateApplication('Identification', field, values))
  }

  onValidate (event, status, errorCodes) {
    if (!event) {
      return
    }
    console.log('Identification ErrorCodes: ', errorCodes)
    let arr = []
    for (var prop in errorCodes) {
      // skip loop if the property is from prototype
      if(!errorCodes.hasOwnProperty(prop)) continue;
      if (errorCodes[prop]) {
        arr.push(`identification.name.${prop}.${errorCodes[prop]}`)
      }
    }
    console.log(arr)
    this.props.dispatch(updateApplication('Errors', "Identification", arr))
  }

  onError () {
    const data = [
      {
        Fieldname: 'ApplicantName',
        Errors: [
          {
            Fieldname: 'first',
            Error: 'Invalid character'
          },
          {
            Fieldname: 'last',
            Error: 'Invalid length'
          }
        ]
      },
      {
        Fieldname: 'ApplicantBirthDate',
        Errors: [
          {
            Fieldname: 'month',
            Error: 'Invalid month'
          }
        ]
      }
    ]

    this.props.dispatch(updateApplication('Errors', 'Identification', [...data]))
  }

  intro () {
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

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <button onClick={this.onError.bind(this)}>Simulate Error</button>
            {this.intro()}
          </SectionView>

          <SectionView
            name="review"
            next="othernames"
            nextLabel="Other Names">
            <ApplicantName
              onUpdate={this.onUpdate.bind(this, 'ApplicantName')}
              onValidate={this.onValidate.bind(this)}
              {...this.props.ApplicantName }
            />
            <ApplicantBirthDate
              onUpdate={this.onUpdate.bind(this, 'ApplicantBirthDate')}
              value={this.props.ApplicantBirthDate}
            />
            <ApplicantBirthPlace
              {...this.props.ApplicantBirthPlace}
              onUpdate={this.onUpdate.bind(this, 'ApplicantBirthPlace')}
            />
          </SectionView>

          <SectionView
            name="name"
            next="identification/birthdate"
            nextLabel="Birth Date">
            <ApplicantName
              onUpdate={this.onUpdate.bind(this, 'ApplicantName')}
              onValidate={this.onValidate.bind(this)}
              {...this.props.ApplicantName }
            />
          </SectionView>

          <SectionView
            name="birthdate"
            next="identification/birthplace"
            nextLabel="Birth Place"
            back="identification/name"
            backLabel="Applicant Name">
            <ApplicantBirthDate
              onUpdate={this.onUpdate.bind(this, 'ApplicantBirthDate')}
              value={this.props.ApplicantBirthDate}
            />
          </SectionView>

          <SectionView
            name="birthplace"
            next="identification/ssn"
            nextLabel="Social Security Number"
            back="identification/birthdate"
            backLabel="Applicant Birthdate">
            <ApplicantBirthPlace
              {...this.props.ApplicantBirthPlace}
              onUpdate={this.onUpdate.bind(this, 'ApplicantBirthPlace')}
            />
          </SectionView>

          <SectionView
            name="ssn"
            next="othernames"
            nextLabel="Other Names"
            back="identification/birthplace"
            backLabel="Applicant Birthplace">
            <ApplicantSSN
              {...this.props.ApplicantSSN}
              onUpdate={this.onUpdate.bind(this, 'ApplicantSSN')}
            />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let app = state.application || {}
  let identification = app.Identification || {}
  return {
    ApplicantName: identification.ApplicantName || {},
    ApplicantBirthDate: processApplicantBirthDate(identification.ApplicantBirthDate) || {},
    ApplicantBirthPlace: identification.ApplicantBirthPlace || {},
    ApplicantSSN: identification.ApplicantSSN || {}
  }
}

function processApplicantBirthDate (birthDate) {
  if (!birthDate) {
    return null
  }

  let d = null
  const { month, day, year } = birthDate
  if (month && day && year) {
    d = new Date(year, month - 1, day)
  }
  return d
}

Identification.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Identification))
