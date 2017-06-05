import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { IntroHeader } from '../../Form'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
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

class SubstanceUse extends SectionElement {
  constructor (props) {
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
  }

  // componentWillReceiveProps (next) {
  //   // Redirect to first alcohol subsection if root subsection is accessed
  //   if (next.subsection === 'alcohol') {
  //     this.props.dispatch(push(`/form/substance/alcohol/negative`))
  //   }
  // }

  updateNegativeImpacts (values) {
    this.handleUpdate('NegativeImpacts', values)
  }

  updateOrderedCounselings (values) {
    this.handleUpdate('OrderedCounselings', values)
  }

  updateVoluntaryCounselings (values) {
    this.handleUpdate('VoluntaryCounselings', values)
  }

  updateReceivedCounselings (values) {
    this.handleUpdate('ReceivedCounselings', values)
  }

  updateDrugUses (values) {
    this.handleUpdate('DrugUses', values)
  }

  updateDrugInvolvements (values) {
    this.handleUpdate('DrugInvolvements', values)
  }

  updateDrugClearanceUses (values) {
    this.handleUpdate('DrugClearanceUses', values)
  }

  updateDrugPublicSafetyUses (values) {
    this.handleUpdate('DrugPublicSafetyUses', values)
  }

  updatePrescriptionUses (values) {
    this.handleUpdate('PrescriptionUses', values)
  }

  updateOrderedTreatments (values) {
    this.handleUpdate('OrderedTreatments', values)
  }

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="">
            <div className="legal intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader errors={() => { return this.props.Errors.some(x => x.valid === false) }}
                  completed={() => { return this.props.Completed.length === 4 && this.props.Completed.every(x => x.valid === true) }}
                  tour={i18n.t('substance.tour.para')}
                  review={i18n.t('substance.review.para')}
                  onTour={this.handleTour}
                  onReview={this.handleReview}
                />
              </div>
            </div>
          </SectionView>

          <SectionView name="drugs/usage"
            back="foreign/business/conferences"
            backLabel={ i18n.t('foreign.destination.business.events') }
            next=""
            nextLabel={''}>
            <DrugUses name="druguses"
              {...this.props.DrugUses}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateDrugUses}
            />
          </SectionView>

          <SectionView name="drugs/purchase"
            back="foreign/business/conferences"
            backLabel={ i18n.t('foreign.destination.business.events') }
            next=""
            nextLabel={''}>
            <DrugInvolvements name="druginvolvements"
              {...this.props.DrugInvolvements}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateDrugInvolvements}
            />
          </SectionView>

          <SectionView name="drugs/clearance"
            back="foreign/business/conferences"
            backLabel={ i18n.t('foreign.destination.business.events') }
            next=""
            nextLabel={''}>
            <DrugClearanceUses name="drugclearanceuses"
              {...this.props.DrugClearanceUses}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateDrugClearanceUses}
            />
          </SectionView>

          <SectionView name="drugs/publicsafety"
            back="foreign/business/conferences"
            backLabel={ i18n.t('foreign.destination.business.events') }
            next=""
            nextLabel={''}>
            <DrugPublicSafetyUses name="drugpublicsafety"
              {...this.props.DrugPublicSafetyUses}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateDrugPublicSafetyUses}
            />
          </SectionView>

          <SectionView name="drugs/misuse"
            back="foreign/business/conferences"
            backLabel={ i18n.t('foreign.destination.business.events') }
            next=""
            nextLabel={''}>
            <PrescriptionUses name="prescriptionuses"
              {...this.props.PrescriptionUses}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updatePrescriptionUses}
            />
          </SectionView>

          <SectionView name="drugs/ordered"
            back="foreign/business/conferences"
            backLabel={ i18n.t('foreign.destination.business.events') }
            next=""
            nextLabel={''}>
            <OrderedTreatments name="ordered"
              {...this.props.OrderedTreatments}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateOrderedTreatments}
            />
          </SectionView>

          <SectionView name="alcohol/negative"
            back="foreign/business/conferences"
            backLabel={ i18n.t('foreign.destination.business.events') }
            next="substance/alcohol/ordered"
            nextLabel={ i18n.t('substance.destination.police.ordered') }>
            <NegativeImpacts name="negative"
              {...this.props.NegativeImpacts}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateNegativeImpacts}
            />
          </SectionView>

          <SectionView name="alcohol/ordered"
            back="substance/alcohol/negative"
            backLabel={ i18n.t('substance.destination.police.negative') }
            next="substance/alcohol/voluntary"
            nextLabel={ i18n.t('substance.destination.police.voluntary') }>
            <OrderedCounselings name="ordered"
              {...this.props.OrderedCounselings}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateOrderedCounselings}
            />
          </SectionView>

          <SectionView name="alcohol/voluntary"
            back="substance/alcohol/ordered"
            backLabel={ i18n.t('substance.destination.police.ordered') }
            next="substance/alcohol/additional"
            nextLabel={ i18n.t('substance.destination.police.additional') }>
            <VoluntaryCounselings name="voluntary"
              {...this.props.VoluntaryCounselings}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateVoluntaryCounselings}
            />
          </SectionView>

          <SectionView name="alcohol/additional"
            back="substance/alcohol/voluntary"
            backLabel={ i18n.t('substance.destination.police.voluntary') }
            next="substance/review"
            nextLabel={ i18n.t('substance.destination.review') }>
            <ReceivedCounselings name="additional"
              {...this.props.ReceivedCounselings}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateReceivedCounselings}
            />
          </SectionView>

          <SectionView name="review"
            title={i18n.t('substance.review.title')}
            back="substance/alcohol/additional"
            backLabel={ i18n.t('substance.destination.police.additional') }
            showTop="true"
            next="legal/police"
            nextLabel={ i18n.t('legal.destination.police') }>
            <NegativeImpacts name="negative"
              defaultState={false}
              {...this.props.NegativeImpacts}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateNegativeImpacts}
            />
            <hr />
            <OrderedCounselings name="ordered"
              defaultState={false}
              {...this.props.OrderedCounselings}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateOrderedCounselings}
            />
            <hr />
            <VoluntaryCounselings name="voluntary"
              defaultState={false}
              {...this.props.VoluntaryCounselings}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateVoluntaryCounselings}
            />
            <hr />
            <ReceivedCounselings name="additional"
              defaultState={false}
              {...this.props.ReceivedCounselings}
              dispatch={this.props.dispatch}
              onError={this.handleError}
              onUpdate={this.updateReceivedCounselings}
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
  let substance = app.SubstanceUse || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    SubstanceUse: substance,
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
    Errors: errors.substance || [],
    Completed: completed.substance || []
  }
}

SubstanceUse.defaultProps = {
  defaultView: 'alcohol/negative',
  store: 'SubstanceUse'
}

export default connect(mapStateToProps)(AuthenticatedView(SubstanceUse))
