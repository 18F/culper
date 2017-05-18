
import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement, IntroHeader, Show } from '../../Form'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import NegativeImpacts from './Alcohol/NegativeImpacts'
import OrderedCounselings from './Alcohol/OrderedCounselings'
import VoluntaryCounselings from './Alcohol/VoluntaryCounselings'
import ReceivedCounselings from './Alcohol/ReceivedCounselings'

class SubstanceUse extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
    this.onValidate = this.onValidate.bind(this)
    this.updateNegativeImpacts = this.updateNegativeImpacts.bind(this)
    this.updateOrderedCounselings = this.updateOrderedCounselings.bind(this)
    this.updateVoluntaryCounselings = this.updateVoluntaryCounselings.bind(this)
    this.updateReceivedCounselings = this.updateReceivedCounselings.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props.SubstanceUse, this.props.subsection, 'negative')
    if (current !== '') {
      this.props.dispatch(push(`/form/substance/alcohol/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/substance'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/substance/review'))
  }

  onUpdate (field, values) {
    this.props.dispatch(updateApplication('SubstanceUse', field, values))
  }

  updateNegativeImpacts (values) {
    this.onUpdate('NegativeImpacts', values)
  }

  updateOrderedCounselings (values) {
    this.onUpdate('OrderedCounselings', values)
  }

  updateVoluntaryCounselings (values) {
    this.onUpdate('VoluntaryCounselings', values)
  }

  updateReceivedCounselings (values) {
    this.onUpdate('ReceivedCounselings', values)
  }

  /**
   * Report errors and completion status
   */
  onValidate (event, status, errorCodes) {
    if (!event.fake) {
      let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
      this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
    }

    let cstatus = 'neutral'
    if (this.hasStatus('negative', status, true) &&
      this.hasStatus('ordered', status, true) &&
      this.hasStatus('received', status, true) &&
      this.hasStatus('voluntary', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('negative', status, false) ||
      this.hasStatus('ordered', status, false) ||
      this.hasStatus('received', status, false) ||
      this.hasStatus('voluntary', status, false)) {
      cstatus = 'incomplete'
    }

    let completed = {
      ...this.props.Completed,
      ...status,
      status: cstatus
    }

    this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  }

  hasStatus (property, status, val) {
    return (this.props.Completed[property] && this.props.Completed[property].status === val) ||
       (status && status[property] && status[property].status === val)
  }

  /**
   * Determine the desired behaviour when visiting the
   * root of a route
   */
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
            <div className="legal intro review-screen">
              <div className="usa-grid-full">
                <IntroHeader Errors={this.props.Errors}
                  Completed={this.props.Completed}
                  tour={i18n.t('substance.tour.para')}
                  review={i18n.t('substance.review.para')}
                  onTour={this.handleTour}
                  onReview={this.handleReview}
                />
              </div>
            </div>
          </SectionView>
          <SectionView name="alcohol/negative"
            back="foreign/business/conferences"
            backLabel={ i18n.t('foreign.destination.business.events') }
            next="substance/alcohol/ordered"
            nextLabel={ i18n.t('substance.destination.police.ordered') }>
            <NegativeImpacts name="negative"
              {...this.props.NegativeImpacts}
              onValidate={this.onValidate}
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
              onValidate={this.onValidate}
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
              onValidate={this.onValidate}
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
              onValidate={this.onValidate}
              onUpdate={this.updateReceivedCounselings}
            />
          </SectionView>

          <SectionView name="review"
            titel={i18n.t('substance.review.title')}
            back="substance/alcohol/additional"
            backLabel={ i18n.t('substance.destination.police.additional') }
            showTop={true}
            next="alcohol/ordered"
            nextLabel={ i18n.t('substance.destination.police.ordered') }>
            <NegativeImpacts name="negative"
              {...this.props.NegativeImpacts}
              onValidate={this.onValidate}
              onUpdate={this.updateNegativeImpacts}
            />
            <hr />
            <OrderedCounselings name="ordered"
              {...this.props.OrderedCounselings}
              onValidate={this.onValidate}
              onUpdate={this.updateOrderedCounselings}
            />
            <hr />
            <VoluntaryCounselings name="voluntary"
              {...this.props.VoluntaryCounselings}
              onValidate={this.onValidate}
              onUpdate={this.updateVoluntaryCounselings}
            />
            <hr />
            <ReceivedCounselings name="additional"
              {...this.props.ReceivedCounselings}
              onValidate={this.onValidate}
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
    Errors: errors.substance || [],
    Completed: completed.substance || []
  }
}

SubstanceUse.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(SubstanceUse))
