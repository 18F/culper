import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { push } from '../../../middleware/history'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import Passport from './Passport'
import Contacts from './Contacts'
import Travel from './Travel'
import { DirectActivity, IndirectActivity, RealEstateActivity, BenefitActivity, Support } from './Activities'
import { Advice, Family, Employment, Ventures, Conferences, Contact, Sponsorship, Political, Voting } from './Business'

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
    this.updateSupport = this.updateSupport.bind(this)
    this.updateConferences = this.updateConferences.bind(this)
    this.updateContact = this.updateContact.bind(this)
    this.updateSponsorship = this.updateSponsorship.bind(this)
    this.updatePolitical = this.updatePolitical.bind(this)
    this.updateVoting = this.updateVoting.bind(this)
    this.updateTravel = this.updateTravel.bind(this)
  }

  componentWillReceiveProps (next) {
    // Redirect to direct control
    if (next.subsection === 'activities') {
      this.props.dispatch(push(`/form/foreign/activities/direct`))
    }
  }

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

  updateSupport (values) {
    this.handleUpdate('Support', values)
  }

  updateConferences (values) {
    this.handleUpdate('Conferences', values)
  }

  updateContact (values) {
    this.handleUpdate('Contact', values)
  }

  updateSponsorship (values) {
    this.handleUpdate('Sponsorship', values)
  }

  updatePolitical (values) {
    this.handleUpdate('Political', values)
  }

  updateVoting (values) {
    this.handleUpdate('Voting', values)
  }

  updateTravel (values) {
    this.handleUpdate('Travel', values)
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="intro"
                       back="military/review"
                       backLabel={i18n.t('military.destination.review')}
                       next="foreign/passport"
                       nextLabel={i18n.t('foreign.destination.passport')}>
            <h2>{i18n.t('temp.intro.title')}</h2>
            {i18n.m('temp.intro.body')}
          </SectionView>

          <SectionView name="review"
                       title={i18n.t('review.title')}
                       para={i18n.m('review.para')}
                       showTop={true}
                       back="foreign/travel"
                       backLabel={i18n.t('foreign.destination.travel')}
                       next="substance/drugs/usage"
                       nextLabel={i18n.t('substance.destination.drugs.usage')}
                       >
            <h2>{i18n.t('foreign.passport.title')}</h2>
            <Passport name="passport"
                      {...this.props.Passport}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updatePassport}
                      onError={this.handleError}
                      />

            <hr/>
            <Contacts name="contacts"
                      {...this.props.Contacts}
                      defaultState={false}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateContacts}
                      onError={this.handleError}
                      />

            <hr/>
            <DirectActivity name="directActivity"
                            {...this.props.DirectActivity}
                            defaultState={false}
                            dispatch={this.props.dispatch}
                            onUpdate={this.updateDirectActivity}
                            onError={this.handleError}
                            />

            <hr/>
            <IndirectActivity name="indirectActivity"
                              {...this.props.IndirectActivity}
                              defaultState={false}
                              dispatch={this.props.dispatch}
                              onUpdate={this.updateIndirectActivity}
                              onError={this.handleError}
                              />

            <hr/>
            <RealEstateActivity name="realEstateActivity"
                                {...this.props.RealEstateActivity}
                                defaultState={false}
                                dispatch={this.props.dispatch}
                                onUpdate={this.updateRealEstateActivity}
                                onError={this.handleError}
                                />

            <hr/>
            <BenefitActivity name="benefitActivity"
                             {...this.props.BenefitActivity}
                             defaultState={false}
                             dispatch={this.props.dispatch}
                             onUpdate={this.updateBenefitActivity}
                             onError={this.handleError}
                             />

            <hr/>
            <Support name="support"
                     {...this.props.Support}
                     defaultState={false}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateSupport}
                     onError={this.handleError}
                     />

            <hr/>
            <Advice name="advice"
                    {...this.props.Advice}
                    defaultState={false}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updateAdvice}
                    onError={this.handleError}
                    />

            <hr/>
            <Family name="family"
                    {...this.props.Family}
                    defaultState={false}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updateFamily}
                    onError={this.handleError}
                    />

            <hr/>
            <Employment name="employment"
                        {...this.props.Employment}
                        defaultState={false}
                        dispatch={this.props.dispatch}
                        onUpdate={this.updateEmployment}
                        onError={this.handleError}
                        />

            <hr/>
            <Ventures name="ventures"
                      {...this.props.Ventures}
                      defaultState={false}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateVentures}
                      onError={this.handleError}
                      />

            <hr/>
            <Conferences name="Conferences"
                         {...this.props.Conferences}
                         defaultState={false}
                         dispatch={this.props.dispatch}
                         onUpdate={this.updateConferences}
                         onError={this.handleError}
                         />

            <hr/>
            <Contact name="Contact"
                     {...this.props.Contact}
                     defaultState={false}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateContact}
                     onError={this.handleError}
                     />

            <hr/>
            <Sponsorship name="Sponsorship"
                         {...this.props.Sponsorship}
                         defaultState={false}
                         dispatch={this.props.dispatch}
                         onUpdate={this.updateSponsorship}
                         onError={this.handleError}
                         />

            <hr/>
            <Political name="Political"
                       {...this.props.Political}
                       defaultState={false}
                       dispatch={this.props.dispatch}
                       onUpdate={this.updatePolitical}
                       onError={this.handleError}
                       />

            <hr/>
            <Voting name="Voting"
                    {...this.props.Voting}
                    defaultState={false}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updateVoting}
                    onError={this.handleError}
                    />

            <hr/>
            <Travel name="Travel"
                    {...this.props.Travel}
                    defaultState={false}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updateTravel}
                    onError={this.handleError}
                    />
          </SectionView>

          <SectionView name="passport"
                       back="foreign/intro"
                       backLabel={i18n.t('foreign.destination.intro')}
                       next="foreign/contacts"
                       nextLabel={i18n.t('foreign.destination.contacts')}>
            <h2>{i18n.t('foreign.passport.title')}</h2>
            <Passport name="passport"
                      dispatch={this.props.dispatch}
                      suggestedNames={this.props.suggestedNames}
                      {...this.props.Passport}
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
                       next="foreign/business/conferences"
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

          <SectionView name="business/contact"
                       back="foreign/business/conferences"
                       backLabel={i18n.t('foreign.destination.business.events')}
                       next="foreign/business/sponsorship"
                       nextLabel={i18n.t('foreign.destination.business.sponsorship')}>
            <Contact name="Contact"
                     {...this.props.Contact}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateContact}
                     onError={this.handleError}
                     />
          </SectionView>

          <SectionView name="business/sponsorship"
                       back="foreign/business/contact"
                       backLabel={i18n.t('foreign.destination.business.contact')}
                       next="foreign/business/political"
                       nextLabel={i18n.t('foreign.destination.business.political')}>
            <Sponsorship name="Sponsorship"
                         {...this.props.Sponsorship}
                         dispatch={this.props.dispatch}
                         onUpdate={this.updateSponsorship}
                         onError={this.handleError}
                         />
          </SectionView>

          <SectionView name="business/political"
                       back="foreign/business/sponsorship"
                       backLabel={i18n.t('foreign.destination.business.sponsorship')}
                       next="foreign/business/voting"
                       nextLabel={i18n.t('foreign.destination.business.voting')}>
            <Political name="Political"
                       {...this.props.Political}
                       dispatch={this.props.dispatch}
                       onUpdate={this.updatePolitical}
                       onError={this.handleError}
                       />
          </SectionView>

          <SectionView name="business/voting"
                       back="foreign/business/political"
                       backLabel={i18n.t('foreign.destination.business.political')}
                       next="foreign/travel"
                       nextLabel={i18n.t('foreign.destination.travel')}>
            <Voting name="Voting"
                    {...this.props.Voting}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updateVoting}
                    onError={this.handleError}
                    />
          </SectionView>

          <SectionView name="travel"
                       back="foreign/business/voting"
                       backLabel={i18n.t('foreign.destination.business.voting')}
                       next="foreign/review"
                       nextLabel={i18n.t('foreign.destination.review')}>
            <Travel name="Travel"
                    {...this.props.Travel}
                    dispatch={this.props.dispatch}
                    onUpdate={this.updateTravel}
                    onError={this.handleError}
                    />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
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
    Contact: foreign.Contact || {},
    Sponsorship: foreign.Sponsorship || {},
    Political: foreign.Political || {},
    Voting: foreign.Voting || {},
    Travel: foreign.Travel || {},
    Errors: errors.foreign || [],
    Completed: completed.foreign || [],
    suggestedNames: names
  }
}

Foreign.defaultProps = {
  section: 'foreign',
  store: 'Foreign'
}

export default connect(mapStateToProps)(AuthenticatedView(Foreign))
