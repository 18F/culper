import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route } from 'react-router-dom'
import { i18n } from 'config'
import { SectionViews, SectionView } from 'components/Section/SectionView'
import SectionNavigation from 'components/Section/shared/SectionNavigation'
import Intro from './Intro'
import NegativeImpacts from './Alcohol/NegativeImpacts'
import OrderedCounselings from './Alcohol/OrderedCounselings'
import VoluntaryCounselings from './Alcohol/VoluntaryCounselings'
import ReceivedCounselings from './Alcohol/ReceivedCounselings'
import DrugUses from './Drugs/DrugUses'
import DrugInvolvements from './Drugs/DrugInvolvements'
import DrugClearanceUses from './Drugs/DrugClearanceUses'
import DrugPublicSafetyUses from './Drugs/DrugPublicSafetyUses'
import PrescriptionUses from './Drugs/PrescriptionUses'
import OrderedTreatments from './Drugs/OrderedTreatments'
import VoluntaryTreatments from './Drugs/VoluntaryTreatments'

class SubstanceUse extends React.Component {
  constructor(props) {
    super(props)

    this.updateNegativeImpacts = this.updateNegativeImpacts.bind(this)
    this.updateOrderedCounselings = this.updateOrderedCounselings.bind(this)
    this.updateVoluntaryCounselings = this.updateVoluntaryCounselings.bind(this)
    this.updateReceivedCounselings = this.updateReceivedCounselings.bind(this)
    this.updateDrugUses = this.updateDrugUses.bind(this)
    this.updateDrugInvolvements = this.updateDrugInvolvements.bind(this)
    this.updateDrugClearanceUses = this.updateDrugClearanceUses.bind(this)
    this.updateDrugPublicSafetyUses = this.updateDrugPublicSafetyUses.bind(this)
    this.updatePrescriptionUses = this.updatePrescriptionUses.bind(this)
    this.updateOrderedTreatments = this.updateOrderedTreatments.bind(this)
    this.updateVoluntaryTreatments = this.updateVoluntaryTreatments.bind(this)
  }

  updateNegativeImpacts(values) {
    this.handleUpdate('NegativeImpacts', values)
  }

  updateOrderedCounselings(values) {
    this.handleUpdate('OrderedCounselings', values)
  }

  updateVoluntaryCounselings(values) {
    this.handleUpdate('VoluntaryCounselings', values)
  }

  updateReceivedCounselings(values) {
    this.handleUpdate('ReceivedCounselings', values)
  }

  updateDrugUses(values) {
    this.handleUpdate('DrugUses', values)
  }

  updateDrugInvolvements(values) {
    this.handleUpdate('DrugInvolvements', values)
  }

  updateDrugClearanceUses(values) {
    this.handleUpdate('DrugClearanceUses', values)
  }

  updateDrugPublicSafetyUses(values) {
    this.handleUpdate('DrugPublicSafetyUses', values)
  }

  updatePrescriptionUses(values) {
    this.handleUpdate('PrescriptionUses', values)
  }

  updateOrderedTreatments(values) {
    this.handleUpdate('OrderedTreatments', values)
  }

  updateVoluntaryTreatments(values) {
    this.handleUpdate('VoluntaryTreatments', values)
  }

  render() {
    const { location } = this.props
    return (
      <div>
        <Route path="/form/substance/intro" component={Intro} />
        <Route path="/form/substance/drugs/usage" component={DrugUses} />
        <Route path="/form/substance/drugs/purchase" component={DrugInvolvements} />
        <Route path="/form/substance/drugs/clearance" component={DrugClearanceUses} />
        <Route path="/form/substance/drugs/publicsafety" component={DrugPublicSafetyUses} />



        <SectionViews
          current={this.props.subsection}
          dispatch={this.props.dispatch}
          update={this.props.update}>
          {/* <SectionView
            name="intro"
            back="financial/review"
            backLabel={i18n.t('financial.destination.review')}
            next="substance/drugs/usage"
            nextLabel={i18n.t('substance.destination.drugs.usage')}>
            <h1 className="section-header">{i18n.t('substance.intro.title')}</h1>
            <Field
              optional={true}
              className="no-margin-bottom">
              {i18n.m('substance.intro.body')}
            </Field>
          </SectionView> */}

          {/* <SectionView
            name="drugs/usage"
            back="substance/intro"
            backLabel={i18n.t('substance.destination.intro')}
            next="substance/drugs/purchase"
            nextLabel={i18n.t('substance.destination.drugs.purchase')}>
            <DrugUses
              name="druguses"
              {...this.props.DrugUses}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateDrugUses}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView> */}

          {/* <SectionView
            name="drugs/purchase"
            back="substance/drugs/usage"
            backLabel={i18n.t('substance.destination.drugs.usage')}
            next="substance/drugs/clearance"
            nextLabel={i18n.t('substance.destination.drugs.clearance')}>
            <DrugInvolvements
              name="druginvolvements"
              {...this.props.DrugInvolvements}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateDrugInvolvements}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView> */}

          {/* <SectionView
            name="drugs/clearance"
            back="substance/drugs/purchase"
            backLabel={i18n.t('substance.destination.drugs.purchase')}
            next="substance/drugs/publicsafety"
            nextLabel={i18n.t('substance.destination.drugs.publicsafety')}>
            <DrugClearanceUses
              name="drugclearanceuses"
              {...this.props.DrugClearanceUses}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateDrugClearanceUses}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView> */}

          {/* <SectionView
            name="drugs/publicsafety"
            back="substance/drugs/clearance"
            backLabel={i18n.t('substance.destination.drugs.clearance')}
            next="substance/drugs/misuse"
            nextLabel={i18n.t('substance.destination.drugs.misuse')}>
            <DrugPublicSafetyUses
              name="drugpublicsafety"
              {...this.props.DrugPublicSafetyUses}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateDrugPublicSafetyUses}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView> */}

          <SectionView
            name="drugs/misuse"
            back="substance/drugs/publicsafety"
            backLabel={i18n.t('substance.destination.drugs.publicsafety')}
            next="substance/drugs/ordered"
            nextLabel={i18n.t('substance.destination.drugs.ordered')}>
            <PrescriptionUses
              name="prescriptionuses"
              {...this.props.PrescriptionUses}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updatePrescriptionUses}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="drugs/ordered"
            back="substance/drugs/misuse"
            backLabel={i18n.t('substance.destination.drugs.misuse')}
            next="substance/drugs/voluntary"
            nextLabel={i18n.t('substance.destination.drugs.voluntary')}>
            <OrderedTreatments
              name="ordered"
              {...this.props.OrderedTreatments}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateOrderedTreatments}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="drugs/voluntary"
            back="substance/drugs/ordered"
            backLabel={i18n.t('substance.destination.drugs.ordered')}
            next="substance/alcohol/negative"
            nextLabel={i18n.t('substance.destination.police.negative')}>
            <VoluntaryTreatments
              name="voluntary"
              {...this.props.VoluntaryTreatments}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateVoluntaryTreatments}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="alcohol/negative"
            back="substance/drugs/voluntary"
            backLabel={i18n.t('substance.destination.drugs.voluntary')}
            next="substance/alcohol/ordered"
            nextLabel={i18n.t('substance.destination.police.ordered')}>
            <NegativeImpacts
              name="negative"
              {...this.props.NegativeImpacts}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateNegativeImpacts}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="alcohol/ordered"
            back="substance/alcohol/negative"
            backLabel={i18n.t('substance.destination.police.negative')}
            next="substance/alcohol/voluntary"
            nextLabel={i18n.t('substance.destination.police.voluntary')}>
            <OrderedCounselings
              name="ordered"
              {...this.props.OrderedCounselings}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateOrderedCounselings}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="alcohol/voluntary"
            back="substance/alcohol/ordered"
            backLabel={i18n.t('substance.destination.police.ordered')}
            next="substance/alcohol/additional"
            nextLabel={i18n.t('substance.destination.police.additional')}>
            <VoluntaryCounselings
              name="voluntary"
              {...this.props.VoluntaryCounselings}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateVoluntaryCounselings}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="alcohol/additional"
            back="substance/alcohol/voluntary"
            backLabel={i18n.t('substance.destination.police.voluntary')}
            next="substance/review"
            nextLabel={i18n.t('substance.destination.review')}>
            <ReceivedCounselings
              name="additional"
              {...this.props.ReceivedCounselings}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateReceivedCounselings}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="review"
            title={i18n.t('substance.review.title')}
            para={i18n.m('substance.review.para')}
            back="substance/alcohol/additional"
            backLabel={i18n.t('substance.destination.police.additional')}
            showTop={true}
            next="legal/intro"
            nextLabel={i18n.t('legal.destination.intro')}>
            <DrugUses
              name="druguses"
              {...this.props.DrugUses}
              section="substance"
              subsection="substance/drugs/usage"
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateDrugUses}
              required={true}
              scrollIntoView={false}
            />

            <hr className="section-divider" />
            <DrugInvolvements
              name="druginvolvements"
              {...this.props.DrugInvolvements}
              section="substance"
              subsection="substance/drugs/purchase"
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateDrugInvolvements}
              required={true}
              scrollIntoView={false}
            />

            <hr className="section-divider" />
            <DrugClearanceUses
              name="drugclearanceuses"
              {...this.props.DrugClearanceUses}
              section="substance"
              subsection="substance/drugs/clearance"
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateDrugClearanceUses}
              required={true}
              scrollIntoView={false}
            />

            <hr className="section-divider" />
            <DrugPublicSafetyUses
              name="drugpublicsafety"
              {...this.props.DrugPublicSafetyUses}
              section="substance"
              subsection="substance/drugs/publicsafety"
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateDrugPublicSafetyUses}
              required={true}
              scrollIntoView={false}
            />

            <hr className="section-divider" />
            <PrescriptionUses
              name="prescriptionuses"
              {...this.props.PrescriptionUses}
              section="substance"
              subsection="substance/drugs/misuse"
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updatePrescriptionUses}
              required={true}
              scrollIntoView={false}
            />

            <hr className="section-divider" />
            <OrderedTreatments
              name="ordered"
              {...this.props.OrderedTreatments}
              section="substance"
              subsection="substance/drugs/ordered"
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateOrderedTreatments}
              required={true}
              scrollIntoView={false}
            />

            <hr className="section-divider" />
            <VoluntaryTreatments
              name="voluntary"
              {...this.props.VoluntaryTreatments}
              section="substance"
              subsection="substance/drugs/voluntary"
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateVoluntaryTreatments}
              required={true}
              scrollIntoView={false}
            />

            <hr className="section-divider" />
            <NegativeImpacts
              name="negative"
              {...this.props.NegativeImpacts}
              section="substance"
              subsection="substance/alcohol/negative"
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateNegativeImpacts}
              required={true}
              scrollIntoView={false}
            />

            <hr className="section-divider" />
            <OrderedCounselings
              name="ordered"
              {...this.props.OrderedCounselings}
              section="substance"
              subsection="substance/alcohol/ordered"
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateOrderedCounselings}
              required={true}
              scrollIntoView={false}
            />

            <hr className="section-divider" />
            <VoluntaryCounselings
              name="voluntary"
              {...this.props.VoluntaryCounselings}
              section="substance"
              subsection="substance/alcohol/voluntary"
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateVoluntaryCounselings}
              required={true}
              scrollIntoView={false}
            />

            <hr className="section-divider" />
            <ReceivedCounselings
              name="additional"
              {...this.props.ReceivedCounselings}
              section="substance"
              subsection="substance/alcohol/additional"
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateReceivedCounselings}
              required={true}
              scrollIntoView={false}
            />
          </SectionView>
        </SectionViews>

        <SectionNavigation currentPath={location.pathname} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const app = state.application || {}
  const substance = app.Substance || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const addressBooks = app.AddressBooks || {}

  return {
    Substance: substance,
    NegativeImpacts: substance.NegativeImpacts || {},
    OrderedCounselings: substance.OrderedCounselings || {},
    VoluntaryCounselings: substance.VoluntaryCounselings || {},
    ReceivedCounselings: substance.ReceivedCounselings || {},
    DrugUses: substance.DrugUses || {},
    DrugInvolvements: substance.DrugInvolvements || {},
    DrugClearanceUses: substance.DrugClearanceUses || {},
    DrugPublicSafetyUses: substance.DrugPublicSafetyUses || {},
    PrescriptionUses: substance.PrescriptionUses || {},
    OrderedTreatments: substance.OrderedTreatments || {},
    VoluntaryTreatments: substance.VoluntaryTreatments || {},
    Errors: errors.substance || [],
    Completed: completed.substance || [],
    AddressBooks: addressBooks
  }
}

SubstanceUse.defaultProps = {
  section: 'substance',
  store: 'Substance',
  scrollToBottom: SectionView.BottomButtonsSelector
}

export class SubstanceUseSections extends React.Component {
  render() {
    return (
      <div>
        <DrugUses
          name="druguses"
          {...this.props.DrugUses}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <DrugInvolvements
          name="druginvolvements"
          {...this.props.DrugInvolvements}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <DrugClearanceUses
          name="drugclearanceuses"
          {...this.props.DrugClearanceUses}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          onUpdate={this.updateDrugClearanceUses}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <DrugPublicSafetyUses
          name="drugpublicsafety"
          {...this.props.DrugPublicSafetyUses}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <PrescriptionUses
          name="prescriptionuses"
          {...this.props.PrescriptionUses}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <OrderedTreatments
          name="ordered"
          {...this.props.OrderedTreatments}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <VoluntaryTreatments
          name="voluntary"
          {...this.props.VoluntaryTreatments}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <NegativeImpacts
          name="negative"
          defaultState={false}
          {...this.props.NegativeImpacts}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <OrderedCounselings
          name="ordered"
          defaultState={false}
          {...this.props.OrderedCounselings}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <VoluntaryCounselings
          name="voluntary"
          defaultState={false}
          {...this.props.VoluntaryCounselings}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <ReceivedCounselings
          name="additional"
          defaultState={false}
          {...this.props.ReceivedCounselings}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />
      </div>
    )
  }
}

export default withRouter(
  connect(mapStateToProps)(SubstanceUse)
)
