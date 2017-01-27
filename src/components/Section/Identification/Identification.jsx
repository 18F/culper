import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import ValidationElement from '../../Form/ValidationElement'
import ApplicantName from '../../Form/Name'
import ApplicantBirthDate from './ApplicantBirthDate'
import ApplicantBirthPlace from './ApplicantBirthPlace'
import ApplicantSSN from './ApplicantSSN'
import OtherNames from './OtherNames'
import Physical from './Physical'
import ContactInformation from './ContactInformation'
import IntroHeader from '../../Form/IntroHeader'
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

    let cstatus = 'neutral'
    if (this.hasStatus('name', status, true)
        && this.hasStatus('birthdate', status, true)
        && this.hasStatus('birthplace', status, true)
        && this.hasStatus('contacts', status, true)
        && this.hasStatus('ssn', status, true)
        && this.hasStatus('othernames', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('name', status, false)
               || this.hasStatus('birthdate', status, false)
               || this.hasStatus('birthplace', status, false)
               || this.hasStatus('contacts', status, false)
               || this.hasStatus('ssn', status, false)
               || this.hasStatus('othernames', status, false)) {
      cstatus = 'incomplete'
    }

    let completed = {
      ...this.props.Completed,
      ...status,
      status: cstatus
    }
    this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  }

  /**
   * Helper to test whether a subsection is complete
   */
  hasStatus (property, status, val) {
    return (this.props.Completed[property] && this.props.Completed[property].status === val)
      || (status && status[property] && status[property].status === val)
  }

  intro () {
    return (
      <div className="identification intro">
        <div className="usa-grid-full">
          <IntroHeader Errors={this.props.Errors} Completed={this.props.Completed} />
        </div>
        <div id="titles" className="usa-grid-full">
          <div className="usa-width-one-half">
            <h3>{i18n.t('identification.tour.title')}</h3>
          </div>
          <div className="usa-width-one-half">
            <h3>{i18n.t('identification.review.title')}</h3>
          </div>
        </div>

        <div id="dialogs" className="usa-grid-full">
          <div className="usa-width-one-half">
            <p>{i18n.t('identification.tour.para')}</p>
          </div>
          <div className="usa-width-one-half">
            <p>{i18n.t('identification.review.para')}</p>
          </div>
        </div>

        <div id="actions" className="usa-grid-full review-btns">
          <div className="usa-width-one-half">
            <button onClick={this.handleTour}>{i18n.t('identification.tour.button')}</button>
          </div>
          <div className="usa-width-one-half">
            <button onClick={this.handleReview}>{i18n.t('identification.review.button')}</button>
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
          <SectionView name="">
            {this.intro()}
          </SectionView>

          <SectionView name="review"
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       next="foreign"
                       nextLabel={i18n.t('foreign.destination.activities')}
                       back="identification/physical"
                       backLabel={i18n.t('identification.destination.physical')}>
            <h2>Your full name</h2>
            <ApplicantName name="name"
                           {...this.props.ApplicantName }
                           className="eapp-field-wrap"
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
                       nextLabel={i18n.t('identification.destination.othernames')}>
            <h2>Your full name</h2>
            <ApplicantName name="name"
                           {...this.props.ApplicantName }
                           className="eapp-field-wrap"
                           onUpdate={this.onUpdate.bind(this, 'ApplicantName')}
                           onValidate={this.onValidate.bind(this)}
                           />
          </SectionView>

          <SectionView name="othernames"
                       back="identification/name"
                       backLabel={i18n.t('identification.destination.name')}
                       next="identification/birthdate"
                       nextLabel={i18n.t('identification.destination.birthdate')}>
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
            <ApplicantBirthDate name="birthdate"
                                onUpdate={this.onUpdate.bind(this, 'ApplicantBirthDate')}
                                onValidate={this.onValidate.bind(this)}
                                value={this.props.ApplicantBirthDate}
                                />
          </SectionView>

          <SectionView name="birthplace"
                       next="identification/contacts"
                       nextLabel={i18n.t('identification.destination.contacts')}
                       back="identification/birthdate"
                       backLabel={i18n.t('identification.destination.birthdate')}>
            <ApplicantBirthPlace name="birthplace"
                                 {...this.props.ApplicantBirthPlace}
                                 onUpdate={this.onUpdate.bind(this, 'ApplicantBirthPlace')}
                                 onValidate={this.onValidate.bind(this)}
                                 />
          </SectionView>

          <SectionView name="contacts"
                       back="identification/birthplace"
                       backLabel={i18n.t('identification.destination.birthplace')}
                       next="identification/ssn"
                       nextLabel={i18n.t('identification.destination.ssn')}>
            <ContactInformation name="contact"
                                {...this.props.Contacts}
                                onUpdate={this.onUpdate.bind(this, 'Contacts')}
                                onValidate={this.onValidate.bind(this)}
                                />
          </SectionView>

          <SectionView name="ssn"
                       back="identification/contacts"
                       backLabel={i18n.t('identification.destination.contacts')}
                       next="identification/physical"
                       nextLabel={i18n.t('identification.destination.physical')}>
            <ApplicantSSN name="ssn"
                          {...this.props.ApplicantSSN}
                          onUpdate={this.onUpdate.bind(this, 'ApplicantSSN')}
                          onValidate={this.onValidate.bind(this)}
                          />
          </SectionView>

          <SectionView name="physical"
                       back="identification/ssn"
                       backLabel={i18n.t('identification.destination.ssn')}
                       next="identification/review"
                       nextLabel={i18n.t('identification.destination.review')}>
            <Physical name="physical"
                      {...this.props.Physical}
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
