import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { IntroHeader } from '../../Form'
import Passport from './Passport'
import Contacts from './Contacts'
import { DirectActivity, IndirectActivity, RealEstateActivity, BenefitActivity, Support } from './Activities'
import { Advice, Family, Employment, Ventures, Conferences } from './Business'

class Foreign extends SectionElement {
  constructor (props) {
    super(props)

    this.updatePassport = this.updatePassport.bind(this)
    this.updateContacts = this.updateContacts.bind(this)
    this.updateAdvice = this.updateAdvice.bind(this)
    this.updateFamily = this.updateFamily.bind(this)
    this.updateEmployment = this.updateEmployment.bind(this)
    this.updateVentures = this.updateVentures.bind(this)
    this.updateDirectActivity = this.updateDirectActivity.bind(this)
    this.updateIndirectActivity = this.updateIndirectActivity.bind(this)
    this.updateRealEstateActivity = this.updateRealEstateActivity.bind(this)
    this.updateBenefitActivity = this.updateBenefitActivity.bind(this)
    this.updateConferences = this.updateConferences.bind(this)
  }

  // /**
  //  * Report errors and completion status
  //  */
  // onValidate (event, status, errorCodes) {
  //   if (!event) {
  //     return
  //   }

  //   if (!event.fake) {
  //     let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
  //     this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
  //   }

  //   let cstatus = 'neutral'
  //   if (this.hasStatus('passport', status, true) &&
  //       this.hasStatus('contacts', status, true) &&
  //       this.hasStatus('directActivity', status, true) &&
  //       this.hasStatus('indirectActivity', status, true) &&
  //       this.hasStatus('realEstateActivity', status, true) &&
  //       this.hasStatus('benefitActivity', status, true) &&
  //       this.hasStatus('advice', status, true) &&
  //       this.hasStatus('family', status, true) &&
  //       this.hasStatus('employment', status, true) &&
  //       this.hasStatus('ventures', status, true) &&
  //       this.hasStatus('conferences', status, true)) {
  //     cstatus = 'complete'
  //   } else if (this.hasStatus('passport', status, false) ||
  //              this.hasStatus('contacts', status, false) ||
  //              this.hasStatus('directActivity', status, false) ||
  //              this.hasStatus('indirectActivity', status, false) ||
  //              this.hasStatus('realEstateActivity', status, false) ||
  //              this.hasStatus('benefitActivity', status, false) ||
  //              this.hasStatus('advice', status, false) ||
  //              this.hasStatus('family', status, false) ||
  //              this.hasStatus('employment', status, false) ||
  //              this.hasStatus('ventures', status, false) ||
  //              this.hasStatus('conferences', status, false)) {
  //     cstatus = 'incomplete'
  //   }
  //   let completed = {
  //     ...this.props.Completed,
  //     ...status,
  //     status: cstatus
  //   }
  //   this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  // }

  updatePassport (values) {
    this.handleUpdate('Passport', values)
  }

  updateContacts (values) {
    this.handleUpdate('Contacts', values)
  }

  updateAdvice (values) {
    this.handleUpdate('Advice', values)
  }

  updateFamily (values) {
    this.handleUpdate('Family', values)
  }

  updateEmployment (values) {
    this.handleUpdate('Employment', values)
  }

  updateVentures (values) {
    this.handleUpdate('Ventures', values)
  }

  updateDirectActivity (values) {
    this.handleUpdate('DirectActivity', values)
  }

  updateIndirectActivity (values) {
    this.handleUpdate('IndirectActivity', values)
  }

  updateRealEstateActivity (values) {
    this.handleUpdate('RealEstateActivity', values)
  }

  updateBenefitActivity (values) {
    this.handleUpdate('BenefitActivity', values)
  }

  updateConferences (values) {
    this.handleUpdate('Conferences', values)
  }

  // /**
  //  * Helper to test whether a subsection is complete
  //  */
  // hasStatus (property, status, val) {
  //   return (this.props.Completed[property] && this.props.Completed[property].status === val)
  //     || (status && status[property] && status[property].status === val)
  // }

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
                      dispatch={this.props.dispatch}
                      onUpdate={this.updatePassport}
                      onError={this.handleError}
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
                      dispatch={this.props.dispatch}
                      suggestedNames={this.props.suggestedNames}
                      onUpdate={this.updatePassport}
                      onError={this.handleError}
                      />
          </SectionView>

          <SectionView name="contacts"
                       back="foreign/passport"
                       backLabel={i18n.t('foreign.destination.passport')}
                       next="foreign/activities"
                       nextLabel={i18n.t('foreign.destination.activities.activity')}>
            <Contacts name="contacts"
                      {...this.props.Contacts}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateContacts}
                      onError={this.handleError}
                      />
          </SectionView>

          <SectionView name="activities"
                       back="foreign/contacts"
                       backLabel={i18n.t('foreign.destination.contacts')}
                       next="foreign/activities/indirect"
                       nextLabel={i18n.t('foreign.destination.activities.indirect')}>
            <DirectActivity name="directActivity"
                            {...this.props.DirectActivity}
                            dispatch={this.props.dispatch}
                            onUpdate={this.updateDirectActivity}
                            onError={this.handleError}
                            />
          </SectionView>
          <SectionView name="activities/direct"
                       back="foreign/contacts"
                       backLabel={i18n.t('foreign.destination.contacts')}
                       next="foreign/activities/indirect"
                       nextLabel={i18n.t('foreign.destination.activities.indirect')}>
            <DirectActivity name="directActivity"
                            {...this.props.DirectActivity}
                            dispatch={this.props.dispatch}
                            onUpdate={this.updateDirectActivity}
                            onError={this.handleError}
                            />
          </SectionView>

          <SectionView name="activities/indirect"
                       back="foreign/activities/direct"
                       backLabel={i18n.t('foreign.destination.activities.direct')}
                       next="foreign/activities/realestate"
                       nextLabel={i18n.t('foreign.destination.activities.realestate')}>
            <IndirectActivity name="indirectActivity"
                              {...this.props.IndirectActivity}
                              dispatch={this.props.dispatch}
                              onUpdate={this.updateIndirectActivity}
                              onError={this.handleError}
                              />
          </SectionView>

          <SectionView name="activities/realestate"
                       back="foreign/activities/indirect"
                       backLabel={i18n.t('foreign.destination.activities.indirect')}
                       next="foreign/activities/benefits"
                       nextLabel={i18n.t('foreign.destination.activities.benefits')}>
            <RealEstateActivity name="realEstateActivity"
                                {...this.props.RealEstateActivity}
                                dispatch={this.props.dispatch}
                                onUpdate={this.updateRealEstateActivity}
                                onError={this.handleError}
                                />
          </SectionView>

          <SectionView name="activities/benefits"
                       back="foreign/activities/realestate"
                       backLabel={i18n.t('foreign.destination.activities.realestate')}
                       next="foreign/activities/support"
                       nextLabel={i18n.t('foreign.destination.activities.support')}>
            <BenefitActivity name="benefitActivity"
                             {...this.props.BenefitActivity}
                             dispatch={this.props.dispatch}
                             onUpdate={this.updateBenefitActivity}
                             onError={this.handleError}
                             />
          </SectionView>
          <SectionView name="activities/support"
                       back="foreign/activities/benefits"
                       backLabel={i18n.t('foreign.destination.activities.benefits')}
                       next="foreign/business/advice"
                       nextLabel={i18n.t('foreign.destination.business.advice')}>
            <Support name="support"
                     {...this.props.Support}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateSupport}
                     onError={this.handleError}
                     />
          </SectionView>

          <SectionView name="business"
                       back="foreign/activities/support"
                       backLabel={i18n.t('foreign.destination.activities.support')}
                       next="foreign/business/family"
                       nextLabel={i18n.t('foreign.destination.business.family')}>
            <Advice name="advice"
                    {...this.props.Advice}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updateAdvice}
                    onError={this.handleError}
                    />
          </SectionView>

          <SectionView name="business/advice"
                       back="foreign/activities/support"
                       backLabel={i18n.t('foreign.destination.activities.support')}
                       next="foreign/business/family"
                       nextLabel={i18n.t('foreign.destination.business.family')}>
            <Advice name="advice"
                    {...this.props.Advice}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updateAdvice}
                    onError={this.handleError}
                    />
          </SectionView>

          <SectionView name="business/family"
                       back="foreign/business/advice"
                       backLabel={i18n.t('foreign.destination.business.advice')}
                       next="foreign/business/employment"
                       nextLabel={i18n.t('foreign.destination.business.employment')}>
            <Family name="family"
                    {...this.props.Family}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updateFamily}
                    onError={this.handleError}
                    />
          </SectionView>

          <SectionView name="business/employment"
                       back="foreign/business/family"
                       backLabel={i18n.t('foreign.destination.business.family')}
                       next="foreign/business/ventures"
                       nextLabel={i18n.t('foreign.destination.business.ventures')}>
            <Employment name="employment"
                        {...this.props.Employment}
                        dispatch={this.props.dispatch}
                        onUpdate={this.updateEmployment}
                        onError={this.handleError}
                        />
          </SectionView>

          <SectionView name="business/ventures"
                       back="foreign/business/employment"
                       backLabel={i18n.t('foreign.destination.business.employment')}
                       next="foreign/business/events"
                       nextLabel={i18n.t('foreign.destination.business.events')}>
            <Ventures name="ventures"
                      {...this.props.Ventures}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateVentures}
                      onError={this.handleError}
                      />
          </SectionView>

          <SectionView name="business/conferences"
                       back="foreign/business/ventures"
                       backLabel={i18n.t('foreign.destination.business.ventures')}
                       next="foreign/business/contact"
                       nextLabel={i18n.t('foreign.destination.business.contact')}>
            <Conferences name="Conferences"
                         {...this.props.Conferences}
                         dispatch={this.props.dispatch}
                         onUpdate={this.updateConferences}
                         onError={this.handleError}
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
    BenefitActivity: foreign.BenefitActivity || {},
    Support: foreign.Support || {},
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
  defaultView: 'passport',
  store: 'Foreign'
}

export default connect(mapStateToProps)(AuthenticatedView(Foreign))
