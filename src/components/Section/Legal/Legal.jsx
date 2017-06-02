import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { IntroHeader, Field } from '../../Form'
import Offenses from './Police/Offenses'
import OtherOffenses from './Police/OtherOffenses'
import DomesticViolenceList from './Police/DomesticViolenceList'
import { History, Revoked, Debarred } from './Investigations'

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

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <div className="legal intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader errors={() => { return this.props.Errors.some(x => x.valid === false) }}
                             completed={() => { return this.props.Completed.length === 3 && this.props.Completed.every(x => x.valid === true) }}
                             tour={i18n.t('legal.tour.para')}
                             review={i18n.t('legal.review.para')}
                             onTour={this.handleTour}
                             onReview={this.handleReview}
                             />
              </div>
            </div>
          </SectionView>

          <SectionView name="review"
                       title="Let&rsquo;s make sure everything looks right"
                       showTop="true"
                       back="legal/investigations/history"
                       backLabel={i18n.t('legal.destination.investigations.history')}
                       next="psychological/intro"
                       nextLabel={i18n.t('psychological.destination.psychological')}>
            <Field title={i18n.t('legal.police.heading.title')}
                   titleSize="h2">
              {i18n.m('legal.police.para.intro1')}
              {i18n.m('legal.police.para.intro2')}
              {i18n.m('legal.police.para.intro3')}
            </Field>

            <Offenses name="offenses"
                      {...this.props.PoliceOffenses}
                      defaultState={false}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updatePoliceOffenses}
                      onError={this.handleError}
                      />

            <OtherOffenses name="otheroffenses"
                           {...this.props.PoliceOtherOffenses}
                           defaultState={false}
                           dispatch={this.props.dispatch}
                           onUpdate={this.updatePoliceOtherOffenses}
                           onError={this.handleError}
                           />

            <DomesticViolenceList name="domesticviolence"
                                  {...this.props.PoliceDomesticViolence}
                                  dispatch={this.props.dispatch}
                                  onUpdate={this.updatePoliceDomesticViolence}
                                  onError={this.handleError}
                                  />

            <History name="history"
                     {...this.props.InvestigationsHistory}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateInvestigationsHistory}
                     onError={this.handleError}
                     />
            <Revoked name="revoked"
                     {...this.props.Revoked}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateRevoked}
                     onError={this.handleError}
                     />
            <Debarred name="debarred"
                      {...this.props.Debarred}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateDebarred}
                      onError={this.handleError}
                      />
          </SectionView>

          <SectionView name="police"
                       back="foreign/business/conferences"
                       backLabel={i18n.t('foreign.destination.business.events')}
                       next="legal/police/offenses"
                       nextLabel={i18n.t('legal.destination.offenses')}>
            <h2>{i18n.t('legal.police.heading.title')}</h2>
            {i18n.m('legal.police.para.intro1')}
            {i18n.m('legal.police.para.intro2')}
            {i18n.m('legal.police.para.intro3')}
          </SectionView>

          <SectionView name="police/offenses"
                       back="legal/police"
                       backLabel={i18n.t('legal.destination.police')}
                       next="legal/police/additionaloffenses"
                       nextLabel={i18n.t('legal.destination.additionalOffenses')}>
            <Offenses name="offenses"
                      {...this.props.PoliceOffenses}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updatePoliceOffenses}
                      onError={this.handleError}
                      />
          </SectionView>

          <SectionView name="police/additionaloffenses"
                       back="legal/police/offenses"
                       backLabel={i18n.t('legal.destination.offenses')}
                       next="legal/police/domesticviolence"
                       nextLabel={i18n.t('legal.destination.domesticViolence')}>
            <OtherOffenses name="otheroffenses"
                           {...this.props.PoliceOtherOffenses}
                           dispatch={this.props.dispatch}
                           onUpdate={this.updatePoliceOtherOffenses}
                           onError={this.handleError}
                           />
          </SectionView>

          <SectionView name="police/domesticviolence"
                       back="legal/police/additionaloffenses"
                       backLabel={i18n.t('legal.destination.additionalOffenses')}
                       next="legal/investigations/history"
                       nextLabel={i18n.t('legal.destination.investigations.history')}>
            <DomesticViolenceList name="domesticviolence"
                                  {...this.props.PoliceDomesticViolence}
                                  dispatch={this.props.dispatch}
                                  onUpdate={this.updatePoliceDomesticViolence}
                                  onError={this.handleError}
                                  />
          </SectionView>

          <SectionView name="investigations"
                       back="legal/police/domesticviolence"
                       backLabel={i18n.t('legal.destination.domesticViolence')}
                       next="legal/investigations/revoked"
                       nextLabel={i18n.t('legal.destination.investigations.revoked')}>
            <History name="history"
                     {...this.props.History}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateHistory}
                     onError={this.handleError}
                     />
          </SectionView>

          <SectionView name="investigations/history"
                       back="legal/police/domesticviolence"
                       backLabel={i18n.t('legal.destination.domesticViolence')}
                       next="legal/investigations/revoked"
                       nextLabel={i18n.t('legal.destination.investigations.revoked')}>
            <History name="history"
                     {...this.props.History}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateHistory}
                     onError={this.handleError}
                     />
          </SectionView>

          <SectionView name="investigations/revoked"
                       back="legal/investigations/history"
                       backLabel={i18n.t('legal.destination.investigations.history')}
                       next="legal/investigations/debarred"
                       nextLabel={i18n.t('legal.destination.investigations.debarred')}>
            <Revoked name="revoked"
                     {...this.props.Revoked}
                     dispatch={this.props.dispatch}
                     onUpdate={this.updateRevoked}
                     onError={this.handleError}
                     />
          </SectionView>

          <SectionView name="investigations/debarred"
                       back="legal/investigations/revoked"
                       backLabel={i18n.t('legal.destination.investigations.revoked')}
                       next="legal/review"
                       nextLabel={i18n.t('legal.destination.review')}>
            <Debarred name="debarred"
                      {...this.props.Debarred}
                      dispatch={this.props.dispatch}
                      onUpdate={this.updateDebarred}
                      onError={this.handleError}
                      />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let legal = app.Legal || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Legal: legal,
    Police: legal.Police || {},
    PoliceOffenses: legal.PoliceOffenses || {},
    PoliceOtherOffenses: legal.PoliceOtherOffenses || {},
    PoliceDomesticViolence: legal.PoliceDomesticViolence || {},
    History: legal.History || {},
    Revoked: legal.Revoked || {},
    Debarred: legal.Debarred || {},
    Errors: errors.legal || [],
    Completed: completed.legal || []
  }
}

Legal.defaultProps = {
  defaultView: 'police',
  store: 'Legal'
}

export default connect(mapStateToProps)(AuthenticatedView(Legal))
