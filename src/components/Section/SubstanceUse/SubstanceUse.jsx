
import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement, IntroHeader, Show } from '../../Form'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import NegativeImpacts from './Alcohol/NegativeImpacts'

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
  }

  componentDidMount () {
    let current = this.launch(this.props.SubstanceUse, this.props.subsection, 'intro')
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

  /**
   * Report errors and completion status
   */
  onValidate (event, status, errorCodes) {
    if (!event.fake) {
      let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
      this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
    }

    let cstatus = 'neutral'
    if (this.hasStatus('negative', status, true)) {
      cstatus = 'complete'
    } else if (this.hasStatus('negative', status, false)) {
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
                  tour={i18n.t('alcohol.tour.para')}
                  review={i18n.t('alcohol.review.para')}
                  onTour={this.handleTour}
                  onReview={this.handleReview}
                />
              </div>
            </div>
          </SectionView>
          <SectionView name="alcohol/negative"
            back="psychological/intro"
            backLabel={ i18n.t('psychological.destination.intro') }
            next="psychological/consultations"
            nextLabel={ i18n.t('psychological.destination.consultation') }>
            <NegativeImpacts name="negative"
              {...this.props.NegativeImpacts}
              onValidate={this.onValidate}
              onUpdate={this.updateNegativeImpacts}
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
  let substanceUse = app.SubstanceUse || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    SubstanceUse: substanceUse,
    NegativeImpacts: substanceUse.NegativeImpacts || {},
    Errors: errors.substanceUse || [],
    Completed: completed.substanceUse || []
  }
}

SubstanceUse.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(SubstanceUse))
