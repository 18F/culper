import React from 'react'
import { connect } from 'react-redux'
import { push } from '../../../middleware/history'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement, IntroHeader } from '../../Form'
import Passport from './Passport'
import Contacts from './Contacts'
import { DirectActivity, IndirectActivity, RealEstateActivity } from './Activities'
import { Advice, Family, Employment, Ventures, Conferences } from './Business'

class Foreign extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
    this.updateAdvice = this.updateAdvice.bind(this)
    this.updateFamily = this.updateFamily.bind(this)
    this.updateEmployment = this.updateEmployment.bind(this)
    this.updateVentures = this.updateVentures.bind(this)
    this.updateDirectActivity = this.updateDirectActivity.bind(this)
    this.updateIndirectActivity = this.updateIndirectActivity.bind(this)
    this.updateRealEstateActivity = this.updateRealEstateActivity.bind(this)
    this.updateConferences = this.updateConferences.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props.Foreign, this.props.subsection, 'passport')
    if (current !== '') {
      this.props.dispatch(push(`/form/foreign/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/foreign/passport'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/foreign/review'))
  }

  /**
   * Report errors and completion status
   */
  onValidate (event, status, errorCodes) {
    if (!event) {
      return
    }

    if (!event.fake) {
      let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
      this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
    }

    let cstatus = 'neutral'
    if (this.hasStatus('passport', status, true) &&
        this.hasStatus('contacts', status, true) &&
        this.hasStatus('directActivity', status, true) &&
        this.hasStatus('indirectActivity', status, true) &&
        this.hasStatus('realEstateActivity', status, true) &&
        this.hasStatus('advice', status, true) &&
        this.hasStatus('family', status, true) &&
        this.hasStatus('employment', status, true) &&
        this.hasStatus('ventures', status, true) &&
        this.hasStatus('conferences', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('passport', status, false) ||
               this.hasStatus('contacts', status, false) ||
               this.hasStatus('directActivity', status, false) ||
               this.hasStatus('indirectActivity', status, false) ||
               this.hasStatus('realEstateActivity', status, false) ||
               this.hasStatus('advice', status, false) ||
               this.hasStatus('family', status, false) ||
               this.hasStatus('employment', status, false) ||
               this.hasStatus('ventures', status, false) ||
               this.hasStatus('conferences', status, false)) {
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
   * Update storage values for a subsection
   */
  onUpdate (field, values) {
    this.props.dispatch(updateApplication('Foreign', field, values))
  }

  updateAdvice (values) {
    this.onUpdate('Advice', values)
  }

  updateFamily (values) {
    this.onUpdate('Family', values)
  }

  updateEmployment (values) {
    this.onUpdate('Employment', values)
  }

  updateVentures (values) {
    this.onUpdate('Ventures', values)
  }

  updateDirectActivity (values) {
    this.onUpdate('DirectActivity', values)
  }

  updateIndirectActivity (values) {
    this.onUpdate('IndirectActivity', values)
  }

  updateRealEstateActivity (values) {
    this.onUpdate('RealEstateActivity', values)
  }

  updateConferences (values) {
    this.onUpdate('Conferences', values)
  }

  /**
   * Helper to test whether a subsection is complete
   */
  hasStatus (property, status, val) {
    return (this.props.Completed[property] && this.props.Completed[property].status === val)
      || (status && status[property] && status[property].status === val)
  }

  /**
   * Determine the desired behaviour when visiting the
   * root of a route
   */
  launch (storage, subsection, defaultView) {
    subsection = subsection || ''
    if (subsection === '') {
      const keys = Object.keys(storage)
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
            <div className="foreign intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader Errors={this.props.Errors}
                             Completed={this.props.Completed}
                             tour={i18n.t('foreign.tour.para')}
                             review={i18n.t('foreign.review.para')}
                             onTour={this.handleTour}
                             onReview={this.handleReview}
                             />
              </div>
            </div>
          </SectionView>

          <SectionView name="review"
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       back="history/federal"
                       backLabel={i18n.t('history.destination.federal')}
                       >
            <h2>{i18n.t('foreign.passport.title')}</h2>
            <Passport name="passport"
                      {...this.props.Passport}
                      onUpdate={this.onUpdate.bind(this, 'Passport')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="passport"
                       back="history/federal"
                       backLabel={i18n.t('history.destination.federal')}
                       next="foreign/review"
                       nextLabel={i18n.t('foreign.destination.review')}>
            <h2>{i18n.t('foreign.passport.title')}</h2>
            <Passport name="passport"
                      {...this.props.Passport}
                      suggestedNames={this.props.suggestedNames}
                      onUpdate={this.onUpdate.bind(this, 'Passport')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="contacts"
                       back="foreign/passport"
                       backLabel={i18n.t('foreign.destination.passport')}
                       next="foreign/activities"
                       nextLabel={i18n.t('foreign.destination.activities.activity')}>
            <Contacts name="contacts"
                      {...this.props.Contacts}
                      onUpdate={this.onUpdate.bind(this, 'Contacts')}
                      onValidate={this.onValidate.bind(this)}
                      />
          </SectionView>

          <SectionView name="activities"
                       back="foreign/contacts"
                       backLabel={i18n.t('foreign.destination.contacts')}
                       next="foreign/activities/indirect"
                       nextLabel={i18n.t('foreign.destination.activities.indirect')}>
            <DirectActivity name="directActivity"
                    {...this.props.DirectActivity}
                    onUpdate={this.updateDirectActivity}
                    onValidate={this.handleValidation}
                    />
          </SectionView>
          <SectionView name="activities/direct"
                       back="foreign/contacts"
                       backLabel={i18n.t('foreign.destination.contacts')}
                       next="foreign/activities/indirect"
                       nextLabel={i18n.t('foreign.destination.activities.indirect')}>
            <DirectActivity name="directActivity"
                    {...this.props.DirectActivity}
                    onUpdate={this.updateDirectActivity}
                    onValidate={this.handleValidation}
                    />
          </SectionView>

          <SectionView name="activities/indirect"
                       back="foreign/activities/direct"
                       backLabel={i18n.t('foreign.destination.activities.direct')}
                       next="foreign/activities/realestate"
                       nextLabel={i18n.t('foreign.destination.activities.realestate')}>
            <IndirectActivity name="indirectActivity"
                    {...this.props.IndirectActivity}
                    onUpdate={this.updateIndirectActivity}
                    onValidate={this.handleValidation}
                    />
          </SectionView>

          <SectionView name="activities/realestate"
                       back="foreign/activities/direct"
                       backLabel={i18n.t('foreign.destination.activities.direct')}
                       next="foreign/activities/realestate"
                       nextLabel={i18n.t('foreign.destination.activities.realestate')}>
            <RealEstateActivity name="realEstateActivity"
                    {...this.props.RealEstateActivity}
                    onUpdate={this.updateRealEstateActivity}
                    onValidate={this.handleValidation}
                    />
          </SectionView>

          <SectionView name="business"
                       back="foreign/activities/support"
                       backLabel={i18n.t('foreign.destination.activities.support')}
                       next="foreign/business/family"
                       nextLabel={i18n.t('foreign.destination.business.family')}>
            <Advice name="advice"
                    {...this.props.Advice}
                    onUpdate={this.updateAdvice}
                    onValidate={this.handleValidation}
                    />
          </SectionView>

          <SectionView name="business/advice"
                       back="foreign/activities/support"
                       backLabel={i18n.t('foreign.destination.activities.support')}
                       next="foreign/business/family"
                       nextLabel={i18n.t('foreign.destination.business.family')}>
            <Advice name="advice"
                    {...this.props.Advice}
                    onUpdate={this.updateAdvice}
                    onValidate={this.handleValidation}
                    />
          </SectionView>

          <SectionView name="business/family"
                       back="foreign/business/advice"
                       backLabel={i18n.t('foreign.destination.business.advice')}
                       next="foreign/business/employment"
                       nextLabel={i18n.t('foreign.destination.business.employment')}>
            <Family name="family"
                    {...this.props.Family}
                    onUpdate={this.updateFamily}
                    onValidate={this.handleValidation}
                    />
          </SectionView>

          <SectionView name="business/employment"
                       back="foreign/business/family"
                       backLabel={i18n.t('foreign.destination.business.family')}
                       next="foreign/business/ventures"
                       nextLabel={i18n.t('foreign.destination.business.ventures')}>
            <Employment name="employment"
                        {...this.props.Employment}
                        onUpdate={this.updateEmployment}
                        onValidate={this.handleValidation}
                        />
          </SectionView>

          <SectionView name="business/ventures"
                       back="foreign/business/employment"
                       backLabel={i18n.t('foreign.destination.business.employment')}
                       next="foreign/business/events"
                       nextLabel={i18n.t('foreign.destination.business.events')}>
            <Ventures name="ventures"
                      {...this.props.Ventures}
                      onUpdate={this.updateVentures}
                      onValidate={this.handleValidation}
                      />
          </SectionView>

          <SectionView name="business/conferences"
                       back="foreign/business/ventures"
                       backLabel={i18n.t('foreign.destination.business.ventures')}
                       next="foreign/business/contact"
                       nextLabel={i18n.t('foreign.destination.business.contact')}>
            <Conferences name="Conferences"
                         {...this.props.Conferences}
                         onUpdate={this.updateConferences}
                         onValidate={this.handleValidation}
                         />
          </SectionView>

          <SectionView name="travel"
                       back="foreign/business/voting"
                       backLabel={i18n.t('foreign.destination.business.voting')}
                       next="foreign/review"
                       nextLabel={i18n.t('foreign.destination.review')}>
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let foreign = app.Foreign || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}

  let identification = app.Identification || {}
  let names = []
  if (identification.ApplicantName) {
    names.push(identification.ApplicantName)
  }

  if (identification.OtherNames && identification.OtherNames.List) {
    for (let item of identification.OtherNames.List) {
      names.push(item.Name)
    }
  }

  return {
    Section: section,
    Foreign: foreign,
    Passport: foreign.Passport || {},
    Contacts: foreign.Contacts || {},
    DirectActivity: foreign.DirectActivity || {},
    IndirectActivity: foreign.IndirectActivity || {},
    RealEstateActivity: foreign.RealEstateActivity || {},
    Advice: foreign.Advice || {},
    Family: foreign.Family || {},
    Employment: foreign.Employment || {},
    Ventures: foreign.Ventures || {},
    Conferences: foreign.Conferences || {},
    Errors: errors.foreign || [],
    Completed: completed.foreign || [],
    suggestedNames: names
  }
}

Foreign.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Foreign))
