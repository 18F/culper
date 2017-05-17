
import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../../config'
import AuthenticatedView from '../../../../views/AuthenticatedView'
import { ValidationElement, IntroHeader, Show } from '../../Form'
import { push } from '../../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../../SectionView'

class Alcohol extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
    this.onValidate = this.onValidate.bind(this)
  }

  componentDidMount () {
    let current = this.launch(this.props.Psychological, this.props.subsection, 'intro')
    if (current !== '') {
      this.props.dispatch(push(`/form/alcohol/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/alcohol/intro'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/alcohol/review'))
  }

  onUpdate (field, values) {
    this.props.dispatch(updateApplication('Alcohol', field, values))
  }

  /**
   * Report errors and completion status
   */
  onValidate (event, status, errorCodes) {
    //if (!event) {
      //return
    //}

    //if (!event.fake) {
      //let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
      //this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
    //}

    //let cstatus = new PsychologicalValidator(null, this.props).completionStatus(status)
    //let completed = {
      //...this.props.Completed,
      //...status,
      //status: cstatus
    //}

    //this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
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
          <SectionView name="negative"
            back="psychological/intro"
            backLabel={ i18n.t('psychological.destination.intro') }
            next="psychological/consultations"
            nextLabel={ i18n.t('psychological.destination.consultation') }>
            <div>Stuff</div>
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let alcohol = app.Alcohol || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Alcohol: alcohol,
    NegativeImpact: alcohol.NegativeImpact || {},
    Errors: errors.financial || [],
    Completed: completed.psychological || [],
    ApplicantBirthDate: extractApplicantBirthDate(app)
  }
}

Alcohol.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Alcohol))
