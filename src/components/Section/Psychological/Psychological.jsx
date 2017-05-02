import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { ValidationElement, IntroHeader, Show } from '../../Form'
import { push } from '../../../middleware/history'
import { updateApplication, reportErrors, reportCompletion } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'
import Competence from './Competence/Competence'
import Consultation from './Consultation/Consultation'
import Hospitalizations from './Hospitalizations/Hospitalizations'
import Diagnoses from './Diagnoses/Diagnoses'
import ExistingConditions from './ExistingConditions/ExistingConditions'
import PsychologicalValidator, { showQuestion21E } from '../../../validators/psychological'
import { extractApplicantBirthDate } from '../extractors'

class Psychological extends ValidationElement {
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
      this.props.dispatch(push(`/form/psychological/${current}`))
    }
  }

  handleTour (event) {
    this.props.dispatch(push('/form/psychological/intro'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/psychological/review'))
  }

  onUpdate (field, values) {
    this.props.dispatch(updateApplication('Psychological', field, values))
  }

  /**
   * Report errors and completion status
   */
  onValidate (event, status, errorCodes) {
    if (!event) {
      return
    }

    if (!event.fake) {
      let errors = super.triageErrors(this.props.Section.section, [...this.props.Errors], errorCodes)
      this.props.dispatch(reportErrors(this.props.Section.section, '', errors))
    }

    let cstatus = new PsychologicalValidator(null, this.props).completionStatus(status)
    let completed = {
      ...this.props.Completed,
      ...status,
      status: cstatus
    }

    this.props.dispatch(reportCompletion(this.props.Section.section, this.props.Section.subsection, completed))
  }

  diagnosesNextLabel () {
    if (this.props.ShowExistingConditions) {
      return i18n.t('psychological.destination.existingConditions')
    }
    return i18n.t('psychological.destination.review')
  }

  diagnosesNext () {
    if (this.props.ShowExistingConditions) {
      return 'psychological/conditions'
    }
    return 'psychological/review'
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
                  tour={i18n.t('psychological.tour.para')}
                  review={i18n.t('psychological.review.para')}
                  onTour={this.handleTour}
                  onReview={this.handleReview}
                />
              </div>
            </div>
          </SectionView>

          <SectionView name="intro"
            back=""
            next="psychological/competence"
            nextLabel={ i18n.m('psychological.destination.competence') }>
            <h2>{ i18n.t('psychological.heading.intro') }</h2>
            { i18n.m('psychological.intro.para1') }
            { i18n.m('psychological.intro.para2') }
            { i18n.m('psychological.intro.para3') }
            { i18n.m('psychological.intro.para4') }
          </SectionView>

          <SectionView name="competence"
            back="psychological/intro"
            backLabel={ i18n.t('psychological.destination.intro') }
            next="psychological/consultations"
            nextLabel={ i18n.t('psychological.destination.consultation') }>
            <Competence name="Competence"
              {...this.props.Competence}
              ApplicantBirthDate={this.props.ApplicantBirthDate}
              onValidate={this.onValidate}
              onUpdate={this.onUpdate.bind(this, 'Competence')} />
          </SectionView>

          <SectionView name="consultations"
            back="psychological/competence"
            backLabel={ i18n.t('psychological.destination.competence') }
            next="psychological/hospitalizations"
            nextLabel={ i18n.t('psychological.destination.hospitalization') }>
            <Consultation name="Consultations"
              {...this.props.Consultations}
              ApplicantBirthDate={this.props.ApplicantBirthDate}
              onValidate={this.onValidate}
              onUpdate={this.onUpdate.bind(this, 'Consultation')} />
          </SectionView>
          <SectionView name="hospitalizations"
            back="psychological/consultations"
            backLabel={ i18n.t('psychological.destination.consultation') }
            next="psychological/diagnoses"
            nextLabel={ i18n.t('psychological.destination.diagnoses') }>
            <Hospitalizations name="Hospitalizations"
              {...this.props.Hospitalizations}
              ApplicantBirthDate={this.props.ApplicantBirthDate}
              onValidate={this.onValidate}
              onUpdate={this.onUpdate.bind(this, 'Hospitalization')} />
          </SectionView>
          <SectionView name="diagnoses"
            back="psychological/hospitalizations"
            backLabel={ i18n.t('psychological.destination.hospitalization') }
            next={this.diagnosesNext()}
            nextLabel={this.diagnosesNextLabel()}>
            <Diagnoses name="Diagnoses"
              {...this.props.Diagnoses}
              ApplicantBirthDate={this.props.ApplicantBirthDate}
              onValidate={this.onValidate}
              onUpdate={this.onUpdate.bind(this, 'Diagnoses')}
            />
          </SectionView>
          <SectionView name="conditions"
            back="psychological/diagnoses"
            backLabel={ i18n.t('psychological.destination.diagnoses') }
            next="psychological/review"
            nextLabel={ i18n.t('psychological.destination.review') }>
            <ExistingConditions name="ExistingConditions"
              {...this.props.ExistingConditions}
              ApplicantBirthDate={this.props.ApplicantBirthDate}
              onValidate={this.onValidate}
              onUpdate={this.onUpdate.bind(this, 'ExistingConditions')}
            />
          </SectionView>
          <SectionView name="review"
            back="psychological/conditions"
            backLabel={ i18n.t('psychological.destination.existingConditions') }>

            <Competence name="Competence"
              {...this.props.Competence}
              ApplicantBirthDate={this.props.ApplicantBirthDate}
              defaultState={false}
              onValidate={this.onValidate}
              onUpdate={this.onUpdate.bind(this, 'Competence')} />
            <hr />
            <Consultation name="Consultations"
              {...this.props.Consultations}
              ApplicantBirthDate={this.props.ApplicantBirthDate}
              defaultState={false}
              onValidate={this.onValidate}
              onUpdate={this.onUpdate.bind(this, 'Consultation')} />
            <hr />
            <Hospitalizations name="Hospitalizations"
              {...this.props.Hospitalizations}
              ApplicantBirthDate={this.props.ApplicantBirthDate}
              defaultState={false}
              onValidate={this.onValidate}
              onUpdate={this.onUpdate.bind(this, 'Hospitalization')} />
            <hr />
            <Diagnoses name="Diagnoses"
              {...this.props.Diagnoses}
              ApplicantBirthDate={this.props.ApplicantBirthDate}
              defaultState={false}
              onValidate={this.onValidate}
              onUpdate={this.onUpdate.bind(this, 'Diagnoses')}
            />
            <hr />
            <Show when={this.props.ShowExistingConditions}>
              <ExistingConditions name="ExistingConditions"
                {...this.props.ExistingConditions}
                ApplicantBirthDate={this.props.ApplicantBirthDate}
                defaultState={false}
                onValidate={this.onValidate}
                onUpdate={this.onUpdate.bind(this, 'ExistingConditions')}
              />
            </Show>
          </SectionView>

        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let section = state.section || {}
  let app = state.application || {}
  let psychological = app.Psychological || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Section: section,
    Psychological: psychological,
    Competence: psychological.Competence,
    Consultations: psychological.Consultation,
    Hospitalizations: psychological.Hospitalization,
    Diagnoses: psychological.Diagnoses,
    ExistingConditions: psychological.ExistingConditions,
    Errors: errors.financial || [],
    Completed: completed.psychological || [],
    ShowExistingConditions: showQuestion21E(psychological),
    ApplicantBirthDate: extractApplicantBirthDate(app)
  }
}

Psychological.defaultProps = {
  subsection: ''
}

export default connect(mapStateToProps)(AuthenticatedView(Psychological))
