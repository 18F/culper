import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidationElement from '../../Form/ValidationElement'
import ApplicantName from '../../Form/Name'
import ApplicantBirthDate from './ApplicantBirthDate'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantSSN from './ApplicantSSN'
import OtherNames from './OtherNames'
import Physical from './Physical'
import ContactInformation from './ContactInformation'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'

class Identification extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props.Identification, this.props.subsection, 'name')
    if (current !== '') {
      this.props.dispatch(push(`/form/identification/${current}`))
    }
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

    let errors = super.triageErrors('identification', [...this.props.Errors], errorCodes)
    this.props.dispatch(reportErrors(this.props.Section.section, '', errors))

    let cstatus = 'neutral'
    if (this.hasStatus('name', true)
        && this.hasStatus('birthdate', true)
        && this.hasStatus('birthplace', true)
        && this.hasStatus('ssn', true)
        && this.hasStatus('othernames', true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('name', false)
               || this.hasStatus('birthdate', false)
               || this.hasStatus('birthplace', false)
               || this.hasStatus('ssn', false)
               || this.hasStatus('othernames', false)) {
      cstatus = 'incomplete'
    }

    let completed = {
      ...this.props.Completed,
      ...status,
      status: cstatus
    }
    this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  }

  hasStatus (property, val) {
    return this.props.Completed[property] && this.props.Completed[property].status === val
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

  launch (storage, subsection, defaultView) {
    subsection = subsection || ''
    if (subsection === '') {
      let keys = Object.keys(storage)
      if (keys.length === 0 && storage.constructor === Object) {
        return defaultView
      }
    }

    return subsection
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name=""
                       next="family"
                       nextLabel="Family & friends">
            {this.intro()}
          </SectionView>

          <SectionView name="review"
                       next="family"
                       nextLabel="Family & friends">
            <ApplicantName name="name"
                           {...this.props.ApplicantName }
                           onUpdate={this.onUpdate.bind(this, 'ApplicantName')}
                           onValidate={this.onValidate.bind(this)}
                           />
            <OtherNames name="othernames"
                        {...this.props.OtherNames}
                        onUpdate={this.onUpdate.bind(this, 'OtherNames')}
                        onValidate={this.onValidate.bind(this)}
                        />
            <ApplicantBirthDate name="birthdate"
                                onUpdate={this.onUpdate.bind(this, 'ApplicantBirthDate')}
                                onValidate={this.onValidate.bind(this)}
                                value={this.props.ApplicantBirthDate}
                                />
            <ApplicantBirthPlace name="birthplace"
                                 {...this.props.ApplicantBirthPlace}
                                 onUpdate={this.onUpdate.bind(this, 'ApplicantBirthPlace')}
                                 onValidate={this.onValidate.bind(this)}
                                 />
            <ApplicantSSN name="ssn"
                          {...this.props.ApplicantSSN}
                          onUpdate={this.onUpdate.bind(this, 'ApplicantSSN')}
                          onValidate={this.onValidate.bind(this)}
                          />
            <Physical name="physical"
                      {...this.props.Physical}
                      onUpdate={this.onUpdate.bind(this, 'Physical')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="name"
                       next="identification/othernames"
                       nextLabel="Other names used">
            <ApplicantName name="name"
                           {...this.props.ApplicantName }
                           onUpdate={this.onUpdate.bind(this, 'ApplicantName')}
                           onValidate={this.onValidate.bind(this)}
                           />
          </SectionView>

          <SectionView name="othernames"
                       back="identification/name"
                       backLabel="Full name"
                       next="identification/birthdate"
                       nextLabel="Birth date">
            <OtherNames name="othernames"
                        {...this.props.OtherNames}
                        onUpdate={this.onUpdate.bind(this, 'OtherNames')}
                        onValidate={this.onValidate.bind(this)}
                        />
          </SectionView>

          <SectionView name="birthdate"
                       next="identification/birthplace"
                       nextLabel="Birth Place"
                       back="identification/othernames"
                       backLabel="Other names used">
            <ApplicantBirthDate name="birthdate"
                                onUpdate={this.onUpdate.bind(this, 'ApplicantBirthDate')}
                                onValidate={this.onValidate.bind(this)}
                                value={this.props.ApplicantBirthDate}
                                />
          </SectionView>

          <SectionView name="birthplace"
                       next="identification/contacts"
                       nextLabel="Contacts"
                       back="identification/birthdate"
                       backLabel="Birth date">
            <ApplicantBirthPlace name="birthplace"
                                 {...this.props.ApplicantBirthPlace}
                                 onUpdate={this.onUpdate.bind(this, 'ApplicantBirthPlace')}
                                 onValidate={this.onValidate.bind(this)}
                                 />
          </SectionView>

          <SectionView name="contacts"
                       back="identification/birthplace"
                       backLabel="Birth place"
                       next="identification/ssn"
                       nextLabel="Social security number">
                       <ContactInformation name="contact"
                         {...this.props.ContactInformation}
                       />
          </SectionView>

          <SectionView name="ssn"
                       back="identification/contacts"
                       backLabel="Contacts"
                       next="identification/physical"
                       nextLabel="Physical attributes">
            <ApplicantSSN name="ssn"
                          {...this.props.ApplicantSSN}
                          onUpdate={this.onUpdate.bind(this, 'ApplicantSSN')}
                          onValidate={this.onValidate.bind(this)}
                          />
          </SectionView>

          <SectionView name="physical"
                       back="identification/ssn"
                       backLabel="Social security number"
                       next="identification/psychological"
                       nextLabel="Psychological and emotional health">
            <Physical name="physical"
                      {...this.props.Physical}
                      onUpdate={this.onUpdate.bind(this, 'Physical')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="psychological"
                       back="identification/physical"
                       backLabel="Physical attributes"
                       next="identification/review"
                       nextLabel="Review">
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let identification = app.Identification || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Identification: identification,
    ApplicantName: identification.ApplicantName || {},
    ApplicantBirthDate: processApplicantBirthDate(identification.ApplicantBirthDate) || {},
    ApplicantBirthPlace: identification.ApplicantBirthPlace || {},
    ApplicantSSN: identification.ApplicantSSN || {},
    OtherNames: identification.OtherNames || {},
    Physical: identification.Physical || {},
    Errors: errors.identification || [],
    Completed: completed.identification || []
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
