import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Show } from '../../Form'
import Competence from './Competence/Competence'
import Consultation from './Consultation/Consultation'
import Hospitalizations from './Hospitalizations/Hospitalizations'
import Diagnoses from './Diagnoses/Diagnoses'
import ExistingConditions from './ExistingConditions/ExistingConditions'
import PsychologicalValidator, { showQuestion21E } from '../../../validators/psychological'
import { extractApplicantBirthDate } from '../extractors'

class Psychological extends SectionElement {
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

  render () {
    return (
      <div>
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView name="intro"
                       back="legal/review"
                       backLabel={ i18n.t('legal.destination.review') }
                       next="psychological/competence"
                       nextLabel={ i18n.t('psychological.destination.competence') }>
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
                        dispatch={this.props.dispatch}
                        onError={this.handleError}
                        onUpdate={this.handleUpdate.bind(this, 'Competence')} />
          </SectionView>

          <SectionView name="consultations"
                       back="psychological/competence"
                       backLabel={ i18n.t('psychological.destination.competence') }
                       next="psychological/hospitalizations"
                       nextLabel={ i18n.t('psychological.destination.hospitalization') }>
            <Consultation name="Consultations"
                          {...this.props.Consultations}
                          ApplicantBirthDate={this.props.ApplicantBirthDate}
                          dispatch={this.props.dispatch}
                          onError={this.handleError}
                          onUpdate={this.handleUpdate.bind(this, 'Consultation')} />
          </SectionView>
          <SectionView name="hospitalizations"
                       back="psychological/consultations"
                       backLabel={ i18n.t('psychological.destination.consultation') }
                       next="psychological/diagnoses"
                       nextLabel={ i18n.t('psychological.destination.diagnoses') }>
            <Hospitalizations name="Hospitalizations"
                              {...this.props.Hospitalizations}
                              ApplicantBirthDate={this.props.ApplicantBirthDate}
                              dispatch={this.props.dispatch}
                              onError={this.handleError}
                              onUpdate={this.handleUpdate.bind(this, 'Hospitalization')} />
          </SectionView>
          <SectionView name="diagnoses"
                       back="psychological/hospitalizations"
                       backLabel={ i18n.t('psychological.destination.hospitalization') }
                       next={this.diagnosesNext()}
                       nextLabel={this.diagnosesNextLabel()}>
            <Diagnoses name="Diagnoses"
                       {...this.props.Diagnoses}
                       ApplicantBirthDate={this.props.ApplicantBirthDate}
                       dispatch={this.props.dispatch}
                       onError={this.handleError}
                       onUpdate={this.handleUpdate.bind(this, 'Diagnoses')}
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
                                dispatch={this.props.dispatch}
                                onError={this.handleError}
                                onUpdate={this.handleUpdate.bind(this, 'ExistingConditions')}
                                />
          </SectionView>
          <SectionView name="review"
                       title={i18n.t('review.title')}
                       para={i18n.m('review.para')}
                       showTop={true}
                       back={this.props.ShowExistingConditions ? 'psychological/conditions' : 'psychological/diagnoses'}
                       backLabel={i18n.t(this.props.ShowExistingConditions ? 'psychological.destination.existingConditions' : 'psychological.destination.diagnoses')}>

            <Competence name="Competence"
                        {...this.props.Competence}
                        ApplicantBirthDate={this.props.ApplicantBirthDate}
                        defaultState={false}
                        dispatch={this.props.dispatch}
                        onError={this.handleError}
                        required={true}
                        scrollIntoView={false}
                        onUpdate={this.handleUpdate.bind(this, 'Competence')} />

            <hr />
            <Consultation name="Consultations"
                          {...this.props.Consultations}
                          ApplicantBirthDate={this.props.ApplicantBirthDate}
                          defaultState={false}
                          dispatch={this.props.dispatch}
                          onError={this.handleError}
                          required={true}
                          scrollIntoView={false}
                          onUpdate={this.handleUpdate.bind(this, 'Consultation')} />

            <hr />
            <Hospitalizations name="Hospitalizations"
                              {...this.props.Hospitalizations}
                              ApplicantBirthDate={this.props.ApplicantBirthDate}
                              defaultState={false}
                              dispatch={this.props.dispatch}
                              onError={this.handleError}
                              required={true}
                              scrollIntoView={false}
                              onUpdate={this.handleUpdate.bind(this, 'Hospitalization')} />

            <hr />
            <Diagnoses name="Diagnoses"
                       {...this.props.Diagnoses}
                       ApplicantBirthDate={this.props.ApplicantBirthDate}
                       defaultState={false}
                       dispatch={this.props.dispatch}
                       onError={this.handleError}
                       required={true}
                       scrollIntoView={false}
                       onUpdate={this.handleUpdate.bind(this, 'Diagnoses')}
                       />

            <Show when={this.props.ShowExistingConditions}>
              <div>
                <hr />
                {this.props.ShowExistingConditions}
                <ExistingConditions name="ExistingConditions"
                                    {...this.props.ExistingConditions}
                                    ApplicantBirthDate={this.props.ApplicantBirthDate}
                                    defaultState={false}
                                    dispatch={this.props.dispatch}
                                    onError={this.handleError}
                                    onUpdate={this.handleUpdate.bind(this, 'ExistingConditions')}
                                    required={this.props.ShowExistingConditions}
                                    scrollIntoView={false}
                                    />
              </div>
            </Show>
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps (state) {
  let app = state.application || {}
  let psychological = app.Psychological || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
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
  section: 'psychological',
  store: 'Psychological'
}

export default connect(mapStateToProps)(AuthenticatedView(Psychological))
