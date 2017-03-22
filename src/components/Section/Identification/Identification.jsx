import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { IdentificationValidator } from '../../../validators'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ApplicantBirthDate from './ApplicantBirthDate'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantSSN from './ApplicantSSN'
import OtherNames from './OtherNames'
import Physical from './Physical'
import ContactInformation from './ContactInformation'
import { IntroHeader, ValidationElement, Name } from '../../Form'
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

    if (!event.fake) {
      let errors = super.triageErrors('identification', [...this.props.Errors], errorCodes)
      this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
    }

    let cstatus = new IdentificationValidator(null, this.props).completionStatus(status)
    let completed = {
      ...this.props.Completed,
      ...status,
      status: cstatus
    }
    this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  }

  intro () {
    return (
      <div className="identification intro review-screen">
        <div className="usa-grid-full">
          <IntroHeader Errors={this.props.Errors}
                       Completed={this.props.Completed}
                       tour={i18n.t('identification.tour.para')}
                       review={i18n.t('identification.review.para')}
                       onTour={this.handleTour}
                       onReview={this.handleReview}
                       />
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
          <SectionView name="">
            {this.intro()}
          </SectionView>

          <SectionView name="review"
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       next="financial"
                       nextLabel={i18n.t('financial.destination.gambling')}
                       back="identification/physical"
                       backLabel={i18n.t('identification.destination.physical')}>

            <h2>{i18n.t('identification.name.title')}</h2>
            <Name name="name"
                  {...this.props.ApplicantName }
                  className="eapp-field-wrap"
                  onUpdate={this.onUpdate.bind(this, 'ApplicantName')}
                  onValidate={this.onValidate.bind(this)}
                  />

            <h2>{i18n.t('identification.othernames.title')}</h2>
            <OtherNames name="othernames"
                        {...this.props.OtherNames}
                        onUpdate={this.onUpdate.bind(this, 'OtherNames')}
                        onValidate={this.onValidate.bind(this)}
                        />

            <h2>{i18n.t('identification.birthdate.title')}</h2>
            <ApplicantBirthDate name="birthdate"
                                className="eapp-field-wrap"
                                onUpdate={this.onUpdate.bind(this, 'ApplicantBirthDate')}
                                onValidate={this.onValidate.bind(this)}
                                value={this.props.ApplicantBirthDate}
                                />

            <h2>{i18n.t('identification.birthplace.title')}</h2>
            <ApplicantBirthPlace name="birthplace"
                                 {...this.props.ApplicantBirthPlace}
                                 className="eapp-field-wrap"
                                 onUpdate={this.onUpdate.bind(this, 'ApplicantBirthPlace')}
                                 onValidate={this.onValidate.bind(this)}
                                 />

            <h2>{i18n.t('identification.contacts.title')}</h2>
            <ContactInformation name="contacts"
                                {...this.props.Contacts}
                                onUpdate={this.onUpdate.bind(this, 'Contacts')}
                                onValidate={this.onValidate.bind(this)}
                                />

            <h2>{i18n.t('identification.ssn.title')}</h2>
            <ApplicantSSN name="ssn"
                          {...this.props.ApplicantSSN}
                          className="eapp-field-wrap"
                          onUpdate={this.onUpdate.bind(this, 'ApplicantSSN')}
                          onValidate={this.onValidate.bind(this)}
                          />

            <h2>{i18n.t('identification.traits.title')}</h2>
            <Physical name="physical"
                      {...this.props.Physical}
                      className="eapp-field-wrap"
                      onUpdate={this.onUpdate.bind(this, 'Physical')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="name"
                       next="identification/contacts"
                       nextLabel={i18n.t('identification.destination.contacts')}>
            <h2>{i18n.t('identification.name.title')}</h2>
            <Name name="name"
                  {...this.props.ApplicantName }
                  className="eapp-field-wrap"
                  onUpdate={this.onUpdate.bind(this, 'ApplicantName')}
                  onValidate={this.onValidate.bind(this)}
                  />
          </SectionView>

          <SectionView name="othernames"
                       back="identification/contacts"
                       backLabel={i18n.t('identification.destination.contacts')}
                       next="identification/birthdate"
                       nextLabel={i18n.t('identification.destination.birthdate')}>
            <h2>{i18n.t('identification.othernames.title')}</h2>
            <OtherNames name="othernames"
                        {...this.props.OtherNames}
                        onUpdate={this.onUpdate.bind(this, 'OtherNames')}
                        onValidate={this.onValidate.bind(this)}
                        />
          </SectionView>

          <SectionView name="birthdate"
                       next="identification/birthplace"
                       nextLabel={i18n.t('identification.destination.birthplace')}
                       back="identification/othernames"
                       backLabel={i18n.t('identification.destination.othernames')}>
            <h2>{i18n.t('identification.birthdate.title')}</h2>
            <ApplicantBirthDate name="birthdate"
                                className="eapp-field-wrap"
                                onUpdate={this.onUpdate.bind(this, 'ApplicantBirthDate')}
                                onValidate={this.onValidate.bind(this)}
                                value={this.props.ApplicantBirthDate}
                                />
          </SectionView>

          <SectionView name="birthplace"
                       next="identification/ssn"
                       nextLabel={i18n.t('identification.destination.ssn')}
                       back="identification/birthdate"
                       backLabel={i18n.t('identification.destination.birthdate')}>
            <h2>{i18n.t('identification.birthplace.title')}</h2>
            <ApplicantBirthPlace name="birthplace"
                                 {...this.props.ApplicantBirthPlace}
                                 className="eapp-field-wrap"
                                 onUpdate={this.onUpdate.bind(this, 'ApplicantBirthPlace')}
                                 onValidate={this.onValidate.bind(this)}
                                 />
          </SectionView>

          <SectionView name="contacts"
                       back="identification/name"
                       backLabel={i18n.t('identification.destination.name')}
                       next="identification/othernames"
                       nextLabel={i18n.t('identification.destination.othernames')}>
            <h2>{i18n.t('identification.contacts.title')}</h2>
            <ContactInformation name="contacts"
                                {...this.props.Contacts}
                                onUpdate={this.onUpdate.bind(this, 'Contacts')}
                                onValidate={this.onValidate.bind(this)}
                                />
          </SectionView>

          <SectionView name="ssn"
                       back="identification/birthplace"
                       backLabel={i18n.t('identification.destination.birthplace')}
                       next="identification/physical"
                       nextLabel={i18n.t('identification.destination.physical')}>
            <h2>{i18n.t('identification.ssn.title')}</h2>
            <ApplicantSSN name="ssn"
                          {...this.props.ApplicantSSN}
                          className="eapp-field-wrap"
                          onUpdate={this.onUpdate.bind(this, 'ApplicantSSN')}
                          onValidate={this.onValidate.bind(this)}
                          />
          </SectionView>

          <SectionView name="physical"
                       back="identification/ssn"
                       backLabel={i18n.t('identification.destination.ssn')}
                       next="identification/review"
                       nextLabel={i18n.t('identification.destination.review')}>
            <h2>{i18n.t('identification.traits.title')}</h2>
            <Physical name="physical"
                      {...this.props.Physical}
                      className="eapp-field-wrap"
                      onUpdate={this.onUpdate.bind(this, 'Physical')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="psychological"
                       back="identification/physical"
                       backLabel={i18n.t('identification.destination.physical')}
                       next="identification/review"
                       nextLabel={i18n.t('identification.destination.review')}>
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
    Contacts: identification.Contacts || {},
    Physical: identification.Physical || {},
    Errors: errors.identification || [],
    Completed: completed.identification || []
  }
}

export function processApplicantBirthDate (birthDate) {
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
