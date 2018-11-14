import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Field } from '../../Form'
import Passport from './Passport'
import Contacts from './Contacts'
import Travel from './Travel'
import {
  DirectActivity,
  IndirectActivity,
  RealEstateActivity,
  BenefitActivity,
  Support
} from './Activities'
import {
  Advice,
  Family,
  Employment,
  Ventures,
  Conferences,
  Contact,
  Sponsorship,
  Political,
  Voting
} from './Business'
import { extractOtherNames } from '../extractors'

class Foreign extends SectionElement {
  constructor(props) {
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

  componentWillReceiveProps(next) {
    // Redirect to direct control
    if (next.subsection === 'activities') {
      this.props.history.push('/form/foreign/activities/direct')
    }
  }

  updatePassport(values) {
    this.handleUpdate('Passport', values)
  }

  updateContacts(values) {
    this.handleUpdate('Contacts', values)
  }

  updateAdvice(values) {
    this.handleUpdate('Advice', values)
  }

  updateFamily(values) {
    this.handleUpdate('Family', values)
  }

  updateEmployment(values) {
    this.handleUpdate('Employment', values)
  }

  updateVentures(values) {
    this.handleUpdate('Ventures', values)
  }

  updateDirectActivity(values) {
    this.handleUpdate('DirectActivity', values)
  }

  updateIndirectActivity(values) {
    this.handleUpdate('IndirectActivity', values)
  }

  updateRealEstateActivity(values) {
    this.handleUpdate('RealEstateActivity', values)
  }

  updateBenefitActivity(values) {
    this.handleUpdate('BenefitActivity', values)
  }

  updateSupport(values) {
    this.handleUpdate('Support', values)
  }

  updateConferences(values) {
    this.handleUpdate('Conferences', values)
  }

  updateContact(values) {
    this.handleUpdate('Contact', values)
  }

  updateSponsorship(values) {
    this.handleUpdate('Sponsorship', values)
  }

  updatePolitical(values) {
    this.handleUpdate('Political', values)
  }

  updateVoting(values) {
    this.handleUpdate('Voting', values)
  }

  updateTravel(values) {
    this.handleUpdate('Travel', values)
  }

  render() {
    return (
      <div>
        <SectionViews
          current={this.props.subsection}
          dispatch={this.props.dispatch}
          update={this.props.update}>
          <SectionView
            name="intro"
            back="military/review"
            backLabel={i18n.t('military.destination.review')}
            next="foreign/passport"
            nextLabel={i18n.t('foreign.destination.passport')}>
            <Field
              title={i18n.t('foreign.intro.title')}
              titleSize="h2"
              optional={true}
              className="no-margin-bottom">
              {i18n.m('foreign.intro.body')}
            </Field>
          </SectionView>

          <SectionView
            name="review"
            title={i18n.t('review.title')}
            para={i18n.m('review.para')}
            showTop={true}
            back="foreign/travel"
            backLabel={i18n.t('foreign.destination.travel')}
            next="financial/intro"
            nextLabel={i18n.t('financial.destination.intro')}>
            <Passport
              name="passport"
              {...this.props.Passport}
              section="foreign"
              subsection="passport"
              dispatch={this.props.dispatch}
              onUpdate={this.updatePassport}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Contacts
              name="contacts"
              {...this.props.Contacts}
              section="foreign"
              subsection="contacts"
              defaultState={false}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateContacts}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <DirectActivity
              name="directActivity"
              {...this.props.DirectActivity}
              section="foreign"
              subsection="activities/direct"
              defaultState={false}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateDirectActivity}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <IndirectActivity
              name="indirectActivity"
              {...this.props.IndirectActivity}
              section="foreign"
              subsection="activities/indirect"
              defaultState={false}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateIndirectActivity}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <RealEstateActivity
              name="realEstateActivity"
              {...this.props.RealEstateActivity}
              section="foreign"
              subsection="activities/realestate"
              defaultState={false}
              dispatch={this.props.dispatch}
              onUpdate={this.updateRealEstateActivity}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <BenefitActivity
              name="benefitActivity"
              {...this.props.BenefitActivity}
              section="foreign"
              subsection="activities/benefits"
              defaultState={false}
              dispatch={this.props.dispatch}
              onUpdate={this.updateBenefitActivity}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Support
              name="support"
              {...this.props.Support}
              section="foreign"
              subsection="activities/support"
              defaultState={false}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateSupport}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Advice
              name="advice"
              {...this.props.Advice}
              section="foreign"
              subsection="business/advice"
              defaultState={false}
              dispatch={this.props.dispatch}
              onUpdate={this.updateAdvice}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Family
              name="family"
              {...this.props.Family}
              section="foreign"
              subsection="business/family"
              defaultState={false}
              dispatch={this.props.dispatch}
              onUpdate={this.updateFamily}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Employment
              name="employment"
              {...this.props.Employment}
              section="foreign"
              subsection="business/employment"
              defaultState={false}
              dispatch={this.props.dispatch}
              onUpdate={this.updateEmployment}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Ventures
              name="ventures"
              {...this.props.Ventures}
              section="foreign"
              subsection="business/ventures"
              defaultState={false}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateVentures}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Conferences
              name="Conferences"
              {...this.props.Conferences}
              section="foreign"
              subsection="business/conferences"
              defaultState={false}
              dispatch={this.props.dispatch}
              onUpdate={this.updateConferences}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Contact
              name="Contact"
              {...this.props.Contact}
              section="foreign"
              subsection="business/contact"
              defaultState={false}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateContact}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Sponsorship
              name="Sponsorship"
              {...this.props.Sponsorship}
              section="foreign"
              subsection="business/sponsorship"
              defaultState={false}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateSponsorship}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Political
              name="Political"
              {...this.props.Political}
              section="foreign"
              subsection="business/political"
              defaultState={false}
              dispatch={this.props.dispatch}
              onUpdate={this.updatePolitical}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Voting
              name="Voting"
              {...this.props.Voting}
              section="foreign"
              subsection="business/voting"
              defaultState={false}
              dispatch={this.props.dispatch}
              onUpdate={this.updateVoting}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Travel
              name="Travel"
              {...this.props.Travel}
              section="foreign"
              subsection="business/travel"
              defaultState={false}
              dispatch={this.props.dispatch}
              onUpdate={this.updateTravel}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
          </SectionView>

          <SectionView
            name="passport"
            back="foreign/intro"
            backLabel={i18n.t('foreign.destination.intro')}
            next="foreign/contacts"
            nextLabel={i18n.t('foreign.destination.contacts')}>
            <Passport
              name="passport"
              dispatch={this.props.dispatch}
              suggestedNames={this.props.suggestedNames}
              {...this.props.Passport}
              onUpdate={this.updatePassport}
              onError={this.handleError}
            />
          </SectionView>

          <SectionView
            name="contacts"
            back="foreign/passport"
            backLabel={i18n.t('foreign.destination.passport')}
            next="foreign/activities"
            nextLabel={i18n.t('foreign.destination.activities.activity')}>
            <Contacts
              name="contacts"
              {...this.props.Contacts}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateContacts}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="activities"
            back="foreign/contacts"
            backLabel={i18n.t('foreign.destination.contacts')}
            next="foreign/activities/indirect"
            nextLabel={i18n.t('foreign.destination.activities.indirect')}>
            <DirectActivity
              name="directActivity"
              {...this.props.DirectActivity}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateDirectActivity}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>
          <SectionView
            name="activities/direct"
            back="foreign/contacts"
            backLabel={i18n.t('foreign.destination.contacts')}
            next="foreign/activities/indirect"
            nextLabel={i18n.t('foreign.destination.activities.indirect')}>
            <DirectActivity
              name="directActivity"
              {...this.props.DirectActivity}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateDirectActivity}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="activities/indirect"
            back="foreign/activities/direct"
            backLabel={i18n.t('foreign.destination.activities.direct')}
            next="foreign/activities/realestate"
            nextLabel={i18n.t('foreign.destination.activities.realestate')}>
            <IndirectActivity
              name="indirectActivity"
              {...this.props.IndirectActivity}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateIndirectActivity}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="activities/realestate"
            back="foreign/activities/indirect"
            backLabel={i18n.t('foreign.destination.activities.indirect')}
            next="foreign/activities/benefits"
            nextLabel={i18n.t('foreign.destination.activities.benefits')}>
            <RealEstateActivity
              name="realEstateActivity"
              {...this.props.RealEstateActivity}
              dispatch={this.props.dispatch}
              onUpdate={this.updateRealEstateActivity}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="activities/benefits"
            back="foreign/activities/realestate"
            backLabel={i18n.t('foreign.destination.activities.realestate')}
            next="foreign/activities/support"
            nextLabel={i18n.t('foreign.destination.activities.support')}>
            <BenefitActivity
              name="benefitActivity"
              {...this.props.BenefitActivity}
              dispatch={this.props.dispatch}
              onUpdate={this.updateBenefitActivity}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>
          <SectionView
            name="activities/support"
            back="foreign/activities/benefits"
            backLabel={i18n.t('foreign.destination.activities.benefits')}
            next="foreign/business/advice"
            nextLabel={i18n.t('foreign.destination.business.advice')}>
            <Support
              name="support"
              {...this.props.Support}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateSupport}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="business"
            back="foreign/activities/support"
            backLabel={i18n.t('foreign.destination.activities.support')}
            next="foreign/business/family"
            nextLabel={i18n.t('foreign.destination.business.family')}>
            <Advice
              name="advice"
              {...this.props.Advice}
              dispatch={this.props.dispatch}
              onUpdate={this.updateAdvice}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="business/advice"
            back="foreign/activities/support"
            backLabel={i18n.t('foreign.destination.activities.support')}
            next="foreign/business/family"
            nextLabel={i18n.t('foreign.destination.business.family')}>
            <Advice
              name="advice"
              {...this.props.Advice}
              dispatch={this.props.dispatch}
              onUpdate={this.updateAdvice}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="business/family"
            back="foreign/business/advice"
            backLabel={i18n.t('foreign.destination.business.advice')}
            next="foreign/business/employment"
            nextLabel={i18n.t('foreign.destination.business.employment')}>
            <Family
              name="family"
              {...this.props.Family}
              dispatch={this.props.dispatch}
              onUpdate={this.updateFamily}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="business/employment"
            back="foreign/business/family"
            backLabel={i18n.t('foreign.destination.business.family')}
            next="foreign/business/ventures"
            nextLabel={i18n.t('foreign.destination.business.ventures')}>
            <Employment
              name="employment"
              {...this.props.Employment}
              dispatch={this.props.dispatch}
              onUpdate={this.updateEmployment}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="business/ventures"
            back="foreign/business/employment"
            backLabel={i18n.t('foreign.destination.business.employment')}
            next="foreign/business/conferences"
            nextLabel={i18n.t('foreign.destination.business.events')}>
            <Ventures
              name="ventures"
              {...this.props.Ventures}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateVentures}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="business/conferences"
            back="foreign/business/ventures"
            backLabel={i18n.t('foreign.destination.business.ventures')}
            next="foreign/business/contact"
            nextLabel={i18n.t('foreign.destination.business.contact')}>
            <Conferences
              name="Conferences"
              {...this.props.Conferences}
              dispatch={this.props.dispatch}
              onUpdate={this.updateConferences}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="business/contact"
            back="foreign/business/conferences"
            backLabel={i18n.t('foreign.destination.business.events')}
            next="foreign/business/sponsorship"
            nextLabel={i18n.t('foreign.destination.business.sponsorship')}>
            <Contact
              name="Contact"
              {...this.props.Contact}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateContact}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="business/sponsorship"
            back="foreign/business/contact"
            backLabel={i18n.t('foreign.destination.business.contact')}
            next="foreign/business/political"
            nextLabel={i18n.t('foreign.destination.business.political')}>
            <Sponsorship
              name="Sponsorship"
              {...this.props.Sponsorship}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.updateSponsorship}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="business/political"
            back="foreign/business/sponsorship"
            backLabel={i18n.t('foreign.destination.business.sponsorship')}
            next="foreign/business/voting"
            nextLabel={i18n.t('foreign.destination.business.voting')}>
            <Political
              name="Political"
              {...this.props.Political}
              dispatch={this.props.dispatch}
              onUpdate={this.updatePolitical}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="business/voting"
            back="foreign/business/political"
            backLabel={i18n.t('foreign.destination.business.political')}
            next="foreign/travel"
            nextLabel={i18n.t('foreign.destination.travel')}>
            <Voting
              name="Voting"
              {...this.props.Voting}
              dispatch={this.props.dispatch}
              onUpdate={this.updateVoting}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="travel"
            back="foreign/business/voting"
            backLabel={i18n.t('foreign.destination.business.voting')}
            next="foreign/review"
            nextLabel={i18n.t('foreign.destination.review')}>
            <Travel
              name="Travel"
              {...this.props.Travel}
              dispatch={this.props.dispatch}
              onUpdate={this.updateTravel}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const app = state.application || {}
  const foreign = app.Foreign || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const addressBooks = app.AddressBooks || {}

  let names = extractOtherNames(app)
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
    suggestedNames: names,
    AddressBooks: addressBooks
  }
}

Foreign.defaultProps = {
  section: 'foreign',
  store: 'Foreign',
  scrollToBottom: SectionView.BottomButtonsSelector
}

export class ForeignSections extends React.Component {
  render() {
    return (
      <div>
        <Passport
          name="passport"
          {...this.props.Passport}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Contacts
          name="contacts"
          {...this.props.Contacts}
          defaultState={false}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <DirectActivity
          name="directActivity"
          {...this.props.DirectActivity}
          defaultState={false}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <IndirectActivity
          name="indirectActivity"
          {...this.props.IndirectActivity}
          defaultState={false}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <RealEstateActivity
          name="realEstateActivity"
          {...this.props.RealEstateActivity}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <BenefitActivity
          name="benefitActivity"
          {...this.props.BenefitActivity}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Support
          name="support"
          {...this.props.Support}
          defaultState={false}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Advice
          name="advice"
          {...this.props.Advice}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Family
          name="family"
          {...this.props.Family}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Employment
          name="employment"
          {...this.props.Employment}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Ventures
          name="ventures"
          {...this.props.Ventures}
          defaultState={false}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Conferences
          name="Conferences"
          {...this.props.Conferences}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Contact
          name="Contact"
          {...this.props.Contact}
          defaultState={false}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Sponsorship
          name="Sponsorship"
          {...this.props.Sponsorship}
          defaultState={false}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Political
          name="Political"
          {...this.props.Political}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Voting
          name="Voting"
          {...this.props.Voting}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Travel
          name="Travel"
          {...this.props.Travel}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.handleError}
          required={true}
          scrollIntoView={false}
        />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(AuthenticatedView(Foreign)))
