import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { extractApplicantBirthdate } from '../extractors'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import SectionComments from '../SectionComments'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Field } from '../../Form'
import Offenses from './Police/Offenses'
import OtherOffenses from './Police/OtherOffenses'
import DomesticViolenceList from './Police/DomesticViolenceList'
import { History, Revoked, Debarred } from './Investigations'
import { Unauthorized, Manipulating, Unlawful } from './Technology'
import NonCriminalCourtActions from './NonCriminalCourtActions'
import { TerroristOrganization, MembershipOverthrow, MembershipViolence,
         EngagedInTerrorism, Advocating, ActivitiesToOverthrow, TerrorismAssociation } from './Associations'

class Legal extends SectionElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.updatePolice = this.updatePolice.bind(this)
    this.updatePoliceOffenses = this.updatePoliceOffenses.bind(this)
    this.updatePoliceOtherOffenses = this.updatePoliceOtherOffenses.bind(this)
    this.updatePoliceDomesticViolence = this.updatePoliceDomesticViolence.bind(this)
    this.updateHistory = this.updateHistory.bind(this)
    this.updateRevoked = this.updateRevoked.bind(this)
    this.updateDebarred = this.updateDebarred.bind(this)
    this.updateNonCriminalCourtActions = this.updateNonCriminalCourtActions.bind(this)
    this.updateUnauthorized = this.updateUnauthorized.bind(this)
    this.updateManipulating = this.updateManipulating.bind(this)
    this.updateUnlawful = this.updateUnlawful.bind(this)
    this.updateTerroristOrganization = this.updateTerroristOrganization.bind(this)
    this.updateMembershipOverthrow = this.updateMembershipOverthrow.bind(this)
    this.updateMembershipViolence = this.updateMembershipViolence.bind(this)
    this.updateEngagedInTerrorism = this.updateEngagedInTerrorism.bind(this)
    this.updateAdvocating = this.updateAdvocating.bind(this)
    this.updateActivitiesToOverthrow = this.updateActivitiesToOverthrow.bind(this)
    this.updateTerrorismAssociation = this.updateTerrorismAssociation.bind(this)
  }

  updatePolice (values) {
    this.handleUpdate('Police', values)
  }

  updatePoliceOffenses (values) {
    this.handleUpdate('PoliceOffenses', values)
  }

  updatePoliceOtherOffenses (values) {
    this.handleUpdate('PoliceOtherOffenses', values)
  }

  updatePoliceDomesticViolence (values) {
    this.handleUpdate('PoliceDomesticViolence', values)
  }

  updateHistory (values) {
    this.handleUpdate('History', values)
  }

  updateRevoked (values) {
    this.handleUpdate('Revoked', values)
  }

  updateDebarred (values) {
    this.handleUpdate('Debarred', values)
  }

  updateNonCriminalCourtActions (values) {
    this.handleUpdate('NonCriminalCourtActions', values)
  }

  updateUnauthorized (values) {
    this.handleUpdate('Unauthorized', values)
  }

  updateManipulating (values) {
    this.handleUpdate('Manipulating', values)
  }

  updateUnlawful (values) {
    this.handleUpdate('Unlawful', values)
  }

  updateTerroristOrganization (values) {
    this.handleUpdate('TerroristOrganization', values)
  }

  updateMembershipOverthrow (values) {
    this.handleUpdate('MembershipOverthrow', values)
  }

  updateMembershipViolence (values) {
    this.handleUpdate('MembershipViolence', values)
  }

  updateEngagedInTerrorism (values) {
    this.handleUpdate('EngagedInTerrorism', values)
  }

  updateAdvocating (values) {
    this.handleUpdate('Advocating', values)
  }

  updateActivitiesToOverthrow (values) {
    this.handleUpdate('ActivitiesToOverthrow', values)
  }

  updateTerrorismAssociation (values) {
    this.handleUpdate('TerrorismAssociation', values)
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="intro"
                       back="substance/review"
                       backLabel={i18n.t('substance.destination.review')}
                       next="legal/police/intro"
                       nextLabel={i18n.t('legal.destination.police')}>
            <Field title={i18n.t('legal.intro.title')}
                   titleSize="h2"
                   optional={true}
                   className="no-margin-bottom">
              {i18n.m('legal.intro.body')}
            </Field>
          </SectionView>

          <SectionView name="police/intro"
                       back="legal/intro"
                       backLabel={i18n.t('legal.destination.intro')}
                       next="legal/police/offenses"
                       nextLabel={i18n.t('legal.destination.offenses')}>
            <Field title={i18n.t('legal.police.heading.title')}
                   titleSize="h2"
                   optional={true}
                   className="no-margin-bottom">
              {i18n.m('legal.police.para.intro1')}
              {i18n.m('legal.police.para.intro2')}
              {i18n.m('legal.police.para.intro3')}
            </Field>
          </SectionView>

          <SectionView name="police/offenses"
                       back="legal/police/intro"
                       backLabel={i18n.t('legal.destination.police')}
                       next="legal/police/additionaloffenses"
                       nextLabel={i18n.t('legal.destination.additionalOffenses')}>
            <Offenses name="offenses"
                      {...this.props.PoliceOffenses}
                      applicantBirthdate={this.props.applicantBirthdate}
                      addressBooks={this.props.AddressBooks}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updatePoliceOffenses}
                      onError={this.handleError}
                      scrollToBottom={this.props.scrollToBottom}
                      />
          </SectionView>

          <SectionView name="police/additionaloffenses"
                       back="legal/police/offenses"
                       backLabel={i18n.t('legal.destination.offenses')}
                       next="legal/police/domesticviolence"
                       nextLabel={i18n.t('legal.destination.domesticViolence')}>
            <OtherOffenses name="otheroffenses"
                           {...this.props.PoliceOtherOffenses}
                           applicantBirthdate={this.props.applicantBirthdate}
                           addressBooks={this.props.AddressBooks}
                           dispatch={this.props.dispatch}
                           onUpdate={this.updatePoliceOtherOffenses}
                           onError={this.handleError}
                           scrollToBottom={this.props.scrollToBottom}
                           />
          </SectionView>

          <SectionView name="police/domesticviolence"
                       back="legal/police/additionaloffenses"
                       backLabel={i18n.t('legal.destination.additionalOffenses')}
                       next="legal/investigations/history"
                       nextLabel={i18n.t('legal.destination.investigations.history')}>
            <DomesticViolenceList name="domesticviolence"
                                  {...this.props.PoliceDomesticViolence}
                                  applicantBirthdate={this.props.applicantBirthdate}
                                  addressBooks={this.props.AddressBooks}
                                  dispatch={this.props.dispatch}
                                  onUpdate={this.updatePoliceDomesticViolence}
                                  onError={this.handleError}
                                  scrollToBottom={this.props.scrollToBottom}
                                  />
          </SectionView>

          <SectionView name="investigations"
                       back="legal/police/domesticviolence"
                       backLabel={i18n.t('legal.destination.domesticViolence')}
                       next="legal/investigations/revoked"
                       nextLabel={i18n.t('legal.destination.investigations.revoked')}>
            <History name="history"
                     {...this.props.History}
                     applicantBirthdate={this.props.applicantBirthdate}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateHistory}
                     onError={this.handleError}
                     scrollToBottom={this.props.scrollToBottom}
                     />
          </SectionView>

          <SectionView name="investigations/history"
                       back="legal/police/domesticviolence"
                       backLabel={i18n.t('legal.destination.domesticViolence')}
                       next="legal/investigations/revoked"
                       nextLabel={i18n.t('legal.destination.investigations.revoked')}>
            <History name="history"
                     {...this.props.History}
                     applicantBirthdate={this.props.applicantBirthdate}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateHistory}
                     onError={this.handleError}
                     scrollToBottom={this.props.scrollToBottom}
                     />
          </SectionView>

          <SectionView name="investigations/revoked"
                       back="legal/investigations/history"
                       backLabel={i18n.t('legal.destination.investigations.history')}
                       next="legal/investigations/debarred"
                       nextLabel={i18n.t('legal.destination.investigations.debarred')}>
            <Revoked name="revoked"
                     {...this.props.Revoked}
                     applicantBirthdate={this.props.applicantBirthdate}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateRevoked}
                     onError={this.handleError}
                     scrollToBottom={this.props.scrollToBottom}
                     />
          </SectionView>

          <SectionView name="investigations/debarred"
                       back="legal/investigations/revoked"
                       backLabel={i18n.t('legal.destination.investigations.revoked')}
                       next="legal/court"
                       nextLabel={i18n.t('legal.destination.court')}>
            <Debarred name="debarred"
                      {...this.props.Debarred}
                      applicantBirthdate={this.props.applicantBirthdate}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateDebarred}
                      onError={this.handleError}
                      scrollToBottom={this.props.scrollToBottom}
                      />
          </SectionView>

          <SectionView name="court"
                       back="legal/investigations/debarred"
                       backLabel={i18n.t('legal.destination.investigations.debarred')}
                       next="legal/technology/unauthorized"
                       nextLabel={i18n.t('legal.destination.technology.unauthorized')}>
            <NonCriminalCourtActions name="courtactions"
                                     {...this.props.NonCriminalCourtActions}
                                     applicantBirthdate={this.props.applicantBirthdate}
                                     addressBooks={this.props.AddressBooks}
                                     dispatch={this.props.dispatch}
                                     onUpdate={this.updateNonCriminalCourtActions}
                                     onError={this.handleError}
                                     scrollToBottom={this.props.scrollToBottom}
                                     />
          </SectionView>

          <SectionView name="technology"
                       back="legal/court"
                       backLabel={i18n.t('legal.destination.court')}
                       next="legal/technology/manipulating"
                       nextLabel={i18n.t('legal.destination.technology.manipulating')}>
            <Unauthorized name="unauthorized"
                          {...this.props.Unauthorized}
                          applicantBirthdate={this.props.applicantBirthdate}
                          addressBooks={this.props.AddressBooks}
                          dispatch={this.props.dispatch}
                          onUpdate={this.updateUnauthorized}
                          onError={this.handleError}
                          scrollToBottom={this.props.scrollToBottom}
                          />
          </SectionView>

          <SectionView name="technology/unauthorized"
                       back="legal/court"
                       backLabel={i18n.t('legal.destination.court')}
                       next="legal/technology/manipulating"
                       nextLabel={i18n.t('legal.destination.technology.manipulating')}>
            <Unauthorized name="unauthorized"
                          {...this.props.Unauthorized}
                          applicantBirthdate={this.props.applicantBirthdate}
                          addressBooks={this.props.AddressBooks}
                          dispatch={this.props.dispatch}
                          onUpdate={this.updateUnauthorized}
                          onError={this.handleError}
                          scrollToBottom={this.props.scrollToBottom}
                          />
          </SectionView>

          <SectionView name="technology/manipulating"
                       back="legal/technology/unauthorized"
                       backLabel={i18n.t('legal.destination.technology.unauthorized')}
                       next="legal/technology/unlawful"
                       nextLabel={i18n.t('legal.destination.technology.unlawful')}>
            <Manipulating name="manipulating"
                          {...this.props.Manipulating}
                          applicantBirthdate={this.props.applicantBirthdate}
                          addressBooks={this.props.AddressBooks}
                          dispatch={this.props.dispatch}
                          onUpdate={this.updateManipulating}
                          onError={this.handleError}
                          scrollToBottom={this.props.scrollToBottom}
                          />
          </SectionView>

          <SectionView name="technology/unlawful"
                       back="legal/technology/manipulating"
                       backLabel={i18n.t('legal.destination.technology.manipulating')}
                       next="legal/associations/terrorist-organization"
                       nextLabel={i18n.t('legal.destination.associations.terrorist')}>
            <Unlawful name="unlawful"
                      {...this.props.Unlawful}
                      applicantBirthdate={this.props.applicantBirthdate}
                      addressBooks={this.props.AddressBooks}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateUnlawful}
                      onError={this.handleError}
                      scrollToBottom={this.props.scrollToBottom}
                      />
          </SectionView>

          <SectionView name="associations"
                       back="legal/technology/unlawful"
                       backLabel={i18n.t('legal.destination.technology.unlawful')}
                       next="legal/associations/engaged-in-terrorism"
                       nextLabel={i18n.t('legal.destination.associations.engaged')}>
            <TerroristOrganization name="terroristOrganization"
                                   {...this.props.TerroristOrganization}
                                   applicantBirthdate={this.props.applicantBirthdate}
                                   addressBooks={this.props.AddressBooks}
                                   dispatch={this.props.dispatch}
                                   onUpdate={this.updateTerroristOrganization}
                                   onError={this.handleError}
                                   scrollToBottom={this.props.scrollToBottom}
                                   />
          </SectionView>

          <SectionView name="associations/terrorist-organization"
                       back="legal/technology/unlawful"
                       backLabel={i18n.t('legal.destination.technology.unlawful')}
                       next="legal/associations/engaged-in-terrorism"
                       nextLabel={i18n.t('legal.destination.associations.engaged')}>
            <TerroristOrganization name="terroristOrganization"
                                   {...this.props.TerroristOrganization}
                                   applicantBirthdate={this.props.applicantBirthdate}
                                   addressBooks={this.props.AddressBooks}
                                   dispatch={this.props.dispatch}
                                   onUpdate={this.updateTerroristOrganization}
                                   onError={this.handleError}
                                   scrollToBottom={this.props.scrollToBottom}
                                   />
          </SectionView>

          <SectionView name="associations/engaged-in-terrorism"
                       back="legal/associations/terrorist-organization"
                       backLabel={i18n.t('legal.destination.associations.terrorist')}
                       next="legal/associations/advocating"
                       nextLabel={i18n.t('legal.destination.associations.advocating')}>
            <EngagedInTerrorism name="engagedInTerrorism"
                                {...this.props.EngagedInTerrorism}
                                applicantBirthdate={this.props.applicantBirthdate}
                                dispatch={this.props.dispatch}
                                onUpdate={this.updateEngagedInTerrorism}
                                onError={this.handleError}
                                scrollToBottom={this.props.scrollToBottom}
                                />
          </SectionView>

          <SectionView name="associations/advocating"
                       back="legal/associations/engaged-in-terrorism"
                       backLabel={i18n.t('legal.destination.associations.engaged')}
                       next="legal/associations/membership-overthrow"
                       nextLabel={i18n.t('legal.destination.associations.overthrow')}>
            <Advocating name="advocating"
                        {...this.props.Advocating}
                        applicantBirthdate={this.props.applicantBirthdate}
                        dispatch={this.props.dispatch}
                        onUpdate={this.updateAdvocating}
                        onError={this.handleError}
                        scrollToBottom={this.props.scrollToBottom}
                        />
          </SectionView>

          <SectionView name="associations/membership-overthrow"
                       back="legal/associations/advocating"
                       backLabel={i18n.t('legal.destination.associations.advocating')}
                       next="legal/associations/membership-violence-or-force"
                       nextLabel={i18n.t('legal.destination.associations.violence')}>
            <MembershipOverthrow name="membershipOverthrow"
                                 {...this.props.MembershipOverthrow}
                                 applicantBirthdate={this.props.applicantBirthdate}
                                 addressBooks={this.props.AddressBooks}
                                 dispatch={this.props.dispatch}
                                 onUpdate={this.updateMembershipOverthrow}
                                 onError={this.handleError}
                                 scrollToBottom={this.props.scrollToBottom}
                                 />
          </SectionView>

          <SectionView name="associations/membership-violence-or-force"
                       back="legal/associations/membership-overthrow"
                       backLabel={i18n.t('legal.destination.associations.overthrow')}
                       next="legal/associations/activities-to-overthrow"
                       nextLabel={i18n.t('legal.destination.associations.activities')}>
            <MembershipViolence name="membershipViolence"
                                {...this.props.MembershipViolence}
                                applicantBirthdate={this.props.applicantBirthdate}
                                addressBooks={this.props.AddressBooks}
                                dispatch={this.props.dispatch}
                                onUpdate={this.updateMembershipViolence}
                                onError={this.handleError}
                                scrollToBottom={this.props.scrollToBottom}
                                />
          </SectionView>

          <SectionView name="associations/activities-to-overthrow"
                       back="legal/associations/membership-violence-or-force"
                       backLabel={i18n.t('legal.destination.associations.violence')}
                       next="legal/associations/terrorism-association"
                       nextLabel={i18n.t('legal.destination.associations.terrorism')}>
            <ActivitiesToOverthrow name="activitiesToOverthrow"
                                   {...this.props.ActivitiesToOverthrow}
                                   applicantBirthdate={this.props.applicantBirthdate}
                                   dispatch={this.props.dispatch}
                                   onUpdate={this.updateActivitiesToOverthrow}
                                   onError={this.handleError}
                                   scrollToBottom={this.props.scrollToBottom}
                                   />
          </SectionView>

          <SectionView name="associations/terrorism-association"
                       back="legal/associations/activities-to-overthrow"
                       backLabel={i18n.t('legal.destination.associations.activities')}
                       next="legal/review"
                       nextLabel={i18n.t('legal.destination.review')}>
            <TerrorismAssociation name="terrorismAssociation"
                                  {...this.props.TerrorismAssociation}
                                  applicantBirthdate={this.props.applicantBirthdate}
                                  dispatch={this.props.dispatch}
                                  onUpdate={this.updateTerrorismAssociation}
                                  onError={this.handleError}
                                  />
          </SectionView>

          <SectionView name="review"
                       title={i18n.t('review.title')}
                       para={i18n.m('review.para')}
                       showTop={true}
                       back="legal/associations/terrorism-activities"
                       backLabel={i18n.t('legal.destination.associations.activities')}
                       next="psychological/intro"
                       nextLabel={i18n.t('psychological.destination.intro')}>
            <Field title={i18n.t('legal.police.heading.title')}
                   titleSize="h2"
                   optional={true}
                   className="no-margin-bottom">
              {i18n.m('legal.police.para.intro1')}
              {i18n.m('legal.police.para.intro2')}
              {i18n.m('legal.police.para.intro3')}
            </Field>

            <Offenses name="offenses"
                      {...this.props.PoliceOffenses}
                      applicantBirthdate={this.props.applicantBirthdate}
                      addressBooks={this.props.AddressBooks}
                      defaultState={false}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updatePoliceOffenses}
                      onError={this.handleError}
                      required={true}
                      scrollIntoView={false}
                      />

            <hr className="section-divider"/>
            <OtherOffenses name="otheroffenses"
                           {...this.props.PoliceOtherOffenses}
                           applicantBirthdate={this.props.applicantBirthdate}
                           addressBooks={this.props.AddressBooks}
                           defaultState={false}
                           dispatch={this.props.dispatch}
                           onUpdate={this.updatePoliceOtherOffenses}
                           onError={this.handleError}
                           required={true}
                           scrollIntoView={false}
                           />

            <hr className="section-divider"/>
            <DomesticViolenceList name="domesticviolence"
                                  {...this.props.PoliceDomesticViolence}
                                  applicantBirthdate={this.props.applicantBirthdate}
                                  addressBooks={this.props.AddressBooks}
                                  dispatch={this.props.dispatch}
                                  onUpdate={this.updatePoliceDomesticViolence}
                                  onError={this.handleError}
                                  required={true}
                                  scrollIntoView={false}
                                  />

            <hr className="section-divider"/>
            <History name="history"
                     {...this.props.History}
                     applicantBirthdate={this.props.applicantBirthdate}
                     defaultState={false}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateHistory}
                     onError={this.handleError}
                     required={true}
                     scrollIntoView={false}
                     />

            <hr className="section-divider"/>
            <Revoked name="revoked"
                     {...this.props.Revoked}
                     applicantBirthdate={this.props.applicantBirthdate}
                     defaultState={false}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateRevoked}
                     onError={this.handleError}
                     required={true}
                     scrollIntoView={false}
                     />

            <hr className="section-divider"/>
            <Debarred name="debarred"
                      {...this.props.Debarred}
                      applicantBirthdate={this.props.applicantBirthdate}
                      defaultState={false}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateDebarred}
                      onError={this.handleError}
                      required={true}
                      scrollIntoView={false}
                      />

            <hr className="section-divider" />
            <NonCriminalCourtActions name="courtactions"
                                     {...this.props.NonCriminalCourtActions}
                                     applicantBirthdate={this.props.applicantBirthdate}
                                     addressBooks={this.props.AddressBooks}
                                     defaultState={false}
                                     dispatch={this.props.dispatch}
                                     onUpdate={this.updateNonCriminalCourtActions}
                                     onError={this.handleError}
                                     required={true}
                                     scrollIntoView={false}
                                     />
            <hr className="section-divider" />
            <Unauthorized name="unauthorized"
                          {...this.props.Unauthorized}
                          applicantBirthdate={this.props.applicantBirthdate}
                          addressBooks={this.props.AddressBooks}
                          defaultState={false}
                          dispatch={this.props.dispatch}
                          onUpdate={this.updateUnauthorized}
                          onError={this.handleError}
                          required={true}
                          scrollIntoView={false}
                          />

            <hr className="section-divider" />
            <Manipulating name="manipulating"
                          {...this.props.Manipulating}
                          applicantBirthdate={this.props.applicantBirthdate}
                          addressBooks={this.props.AddressBooks}
                          defaultState={false}
                          dispatch={this.props.dispatch}
                          onUpdate={this.updateManipulating}
                          onError={this.handleError}
                          required={true}
                          scrollIntoView={false}
                          />

            <hr className="section-divider" />
            <Unlawful name="unlawful"
                      {...this.props.Unlawful}
                      applicantBirthdate={this.props.applicantBirthdate}
                      addressBooks={this.props.AddressBooks}
                      defaultState={false}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateUnlawful}
                      onError={this.handleError}
                      required={true}
                      scrollIntoView={false}
                      />

            <hr className="section-divider" />
            <TerroristOrganization name="terroristOrganization"
                                   {...this.props.TerroristOrganization}
                                   applicantBirthdate={this.props.applicantBirthdate}
                                   addressBooks={this.props.AddressBooks}
                                   dispatch={this.props.dispatch}
                                   onUpdate={this.updateTerroristOrganization}
                                   onError={this.handleError}
                                   required={true}
                                   scrollIntoView={false}
                                   />

            <hr className="section-divider" />
            <EngagedInTerrorism name="engagedInTerrorism"
                                {...this.props.EngagedInTerrorism}
                                applicantBirthdate={this.props.applicantBirthdate}
                                dispatch={this.props.dispatch}
                                onUpdate={this.updateEngagedInTerrorism}
                                onError={this.handleError}
                                required={true}
                                scrollIntoView={false}
                                />

            <hr className="section-divider" />
            <Advocating name="advocating"
                        {...this.props.Advocating}
                        applicantBirthdate={this.props.applicantBirthdate}
                        dispatch={this.props.dispatch}
                        onUpdate={this.updateAdvocating}
                        onError={this.handleError}
                        required={true}
                        scrollIntoView={false}
                        />

            <hr className="section-divider" />
            <MembershipOverthrow name="membershipOverthrow"
                                 {...this.props.MembershipOverthrow}
                                 applicantBirthdate={this.props.applicantBirthdate}
                                 addressBooks={this.props.AddressBooks}
                                 dispatch={this.props.dispatch}
                                 onUpdate={this.updateMembershipOverthrow}
                                 onError={this.handleError}
                                 required={true}
                                 scrollIntoView={false}
                                 />

            <hr className="section-divider" />
            <MembershipViolence name="membershipViolence"
                                {...this.props.MembershipViolence}
                                applicantBirthdate={this.props.applicantBirthdate}
                                addressBooks={this.props.AddressBooks}
                                dispatch={this.props.dispatch}
                                onUpdate={this.updateMembershipViolence}
                                onError={this.handleError}
                                required={true}
                                scrollIntoView={false}
                                />

            <hr className="section-divider" />
            <ActivitiesToOverthrow name="activitiesToOverthrow"
                                   {...this.props.ActivitiesToOverthrow}
                                   applicantBirthdate={this.props.applicantBirthdate}
                                   dispatch={this.props.dispatch}
                                   onUpdate={this.updateActivitiesToOverthrow}
                                   onError={this.handleError}
                                   required={true}
                                   scrollIntoView={false}
                                   />

            <hr className="section-divider" />
            <TerrorismAssociation name="terrorismAssociation"
                                  {...this.props.TerrorismAssociation}
                                  applicantBirthdate={this.props.applicantBirthdate}
                                  dispatch={this.props.dispatch}
                                  onUpdate={this.updateTerrorismAssociation}
                                  onError={this.handleError}
                                  required={true}
                                  scrollIntoView={false}
                                  />

            <hr className="section-divider" />
            <SectionComments name="comments"
                             {...this.props.Comments}
                             title={i18n.t('legal.review.comments')}
                             dispatch={this.props.dispatch}
                             onUpdate={this.handleUpdate.bind(this, 'Comments')}
                             onError={this.handleError}
                             required={false}
                             scrollIntoView={false}
                             />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const app = state.application || {}
  const legal = app.Legal || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const addressBooks = app.AddressBooks || {}

  return {
    Legal: legal,
    Police: legal.Police || {},
    PoliceOffenses: legal.PoliceOffenses || {},
    PoliceOtherOffenses: legal.PoliceOtherOffenses || {},
    PoliceDomesticViolence: legal.PoliceDomesticViolence || {},
    History: legal.History || {},
    Revoked: legal.Revoked || {},
    Debarred: legal.Debarred || {},
    NonCriminalCourtActions: legal.NonCriminalCourtActions || {},
    Unauthorized: legal.Unauthorized || {},
    Manipulating: legal.Manipulating || {},
    Unlawful: legal.Unlawful || {},
    TerroristOrganization: legal.TerroristOrganization || {},
    MembershipOverthrow: legal.MembershipOverthrow || {},
    MembershipViolence: legal.MembershipViolence || {},
    EngagedInTerrorism: legal.EngagedInTerrorism || {},
    Advocating: legal.Advocating || {},
    ActivitiesToOverthrow: legal.ActivitiesToOverthrow || {},
    TerrorismAssociation: legal.TerrorismAssociation || {},
    Comments: legal.Comments || {},
    Errors: errors.legal || [],
    Completed: completed.legal || [],
    applicantBirthdate: extractApplicantBirthdate(app),
    AddressBooks: addressBooks
  }
}

Legal.defaultProps = {
  section: 'legal',
  store: 'Legal',
  scrollToBottom: SectionView.BottomButtonsSelector
}

export class LegalSections extends React.Component {
  render () {
    return (
      <div>
        <Field title={i18n.t('legal.police.heading.title')}
               titleSize="h2"
               optional={true}
               className="no-margin-bottom">
          {i18n.m('legal.police.para.intro1')}
          {i18n.m('legal.police.para.intro2')}
          {i18n.m('legal.police.para.intro3')}
        </Field>

        <Offenses name="offenses"
                  {...this.props.PoliceOffenses}
                  addressBooks={this.props.AddressBooks}
                  defaultState={false}
                  dispatch={this.props.dispatch}
                  onError={this.props.onError}
                  required={true}
                  scrollIntoView={false}
                  />

        <hr className="section-divider"/>
        <OtherOffenses name="otheroffenses"
                       {...this.props.PoliceOtherOffenses}
                       addressBooks={this.props.AddressBooks}
                       defaultState={false}
                       dispatch={this.props.dispatch}
                       onError={this.props.onError}
                       required={true}
                       scrollIntoView={false}
                       />

        <hr className="section-divider"/>
        <DomesticViolenceList name="domesticviolence"
                              {...this.props.PoliceDomesticViolence}
                              addressBooks={this.props.AddressBooks}
                              dispatch={this.props.dispatch}
                              onError={this.props.onError}
                              required={true}
                              scrollIntoView={false}
                              />

        <hr className="section-divider"/>
        <History name="history"
                 {...this.props.History}
                 defaultState={false}
                 dispatch={this.props.dispatch}
                 onError={this.props.onError}
                 required={true}
                 scrollIntoView={false}
                 />

        <hr className="section-divider"/>
        <Revoked name="revoked"
                 {...this.props.Revoked}
                 defaultState={false}
                 dispatch={this.props.dispatch}
                 onError={this.props.onError}
                 required={true}
                 scrollIntoView={false}
                 />

        <hr className="section-divider"/>
        <Debarred name="debarred"
                  {...this.props.Debarred}
                  defaultState={false}
                  dispatch={this.props.dispatch}
                  onError={this.props.onError}
                  required={true}
                  scrollIntoView={false}
                  />

        <hr className="section-divider" />
        <NonCriminalCourtActions name="courtactions"
                                 {...this.props.NonCriminalCourtActions}
                                 addressBooks={this.props.AddressBooks}
                                 defaultState={false}
                                 dispatch={this.props.dispatch}
                                 onError={this.props.onError}
                                 required={true}
                                 scrollIntoView={false}
                                 />
        <hr className="section-divider" />
        <Unauthorized name="unauthorized"
                      {...this.props.Unauthorized}
                      addressBooks={this.props.AddressBooks}
                      defaultState={false}
                      dispatch={this.props.dispatch}
                      onError={this.props.onError}
                      required={true}
                      scrollIntoView={false}
                      />

        <hr className="section-divider" />
        <Manipulating name="manipulating"
                      {...this.props.Manipulating}
                      addressBooks={this.props.AddressBooks}
                      defaultState={false}
                      dispatch={this.props.dispatch}
                      onError={this.props.onError}
                      required={true}
                      scrollIntoView={false}
                      />

        <hr className="section-divider" />
        <Unlawful name="unlawful"
                  {...this.props.Unlawful}
                  addressBooks={this.props.AddressBooks}
                  defaultState={false}
                  dispatch={this.props.dispatch}
                  onError={this.props.onError}
                  required={true}
                  scrollIntoView={false}
                  />

        <hr className="section-divider" />
        <TerroristOrganization name="terroristOrganization"
                               {...this.props.TerroristOrganization}
                               addressBooks={this.props.AddressBooks}
                               dispatch={this.props.dispatch}
                               onError={this.props.onError}
                               required={true}
                               scrollIntoView={false}
                               />

        <hr className="section-divider" />
        <EngagedInTerrorism name="engagedInTerrorism"
                            {...this.props.EngagedInTerrorism}
                            dispatch={this.props.dispatch}
                            onError={this.props.onError}
                            required={true}
                            scrollIntoView={false}
                            />

        <hr className="section-divider" />
        <Advocating name="advocating"
                    {...this.props.Advocating}
                    dispatch={this.props.dispatch}
                    onError={this.props.onError}
                    required={true}
                    scrollIntoView={false}
                    />

        <hr className="section-divider" />
        <MembershipOverthrow name="membershipOverthrow"
                             {...this.props.MembershipOverthrow}
                             addressBooks={this.props.AddressBooks}
                             dispatch={this.props.dispatch}
                             onError={this.props.onError}
                             required={true}
                             scrollIntoView={false}
                             />

        <hr className="section-divider" />
        <MembershipViolence name="membershipViolence"
                            {...this.props.MembershipViolence}
                            addressBooks={this.props.AddressBooks}
                            dispatch={this.props.dispatch}
                            onError={this.props.onError}
                            required={true}
                            scrollIntoView={false}
                            />

        <hr className="section-divider" />
        <ActivitiesToOverthrow name="activitiesToOverthrow"
                               {...this.props.ActivitiesToOverthrow}
                               dispatch={this.props.dispatch}
                               onError={this.props.onError}
                               required={true}
                               scrollIntoView={false}
                               />

        <hr className="section-divider" />
        <TerrorismAssociation name="terrorismAssociation"
                              {...this.props.TerrorismAssociation}
                              dispatch={this.props.dispatch}
                              onError={this.props.onError}
                              required={true}
                              scrollIntoView={false}
                              />

        <hr className="section-divider" />
        <SectionComments name="comments"
                         {...this.props.Comments}
                         title={i18n.t('legal.review.comments')}
                         dispatch={this.props.dispatch}
                         onError={this.handleError}
                         required={false}
                         scrollIntoView={false}
                         />
      </div>
    )
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Legal))
