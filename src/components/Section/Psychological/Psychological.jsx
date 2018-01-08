import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '../../../config'
import { SectionViews, SectionView } from '../SectionView'
import SectionElement from '../SectionElement'
import SectionComments from '../SectionComments'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Show, Field } from '../../Form'
import Competence from './Competence/Competence'
import Consultation from './Consultation/Consultation'
import Hospitalizations from './Hospitalizations/Hospitalizations'
import Diagnoses from './Diagnoses/Diagnoses'
import ExistingConditions from './ExistingConditions/ExistingConditions'
import { showQuestion21E } from '../../../validators/psychological'
import { extractApplicantBirthdate } from '../extractors'

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
            <Field title={ i18n.t('psychological.heading.intro') }
                   titleSize="h2"
                   optional={true}
                   className="no-margin-bottom">
              { i18n.m('psychological.intro.para1') }
              { i18n.m('psychological.intro.para2') }
              { i18n.m('psychological.intro.para3') }
              { i18n.m('psychological.intro.para4') }
            </Field>

          </SectionView>

          <SectionView name="competence"
                       back="psychological/intro"
                       backLabel={ i18n.t('psychological.destination.intro') }
                       next="psychological/consultations"
                       nextLabel={ i18n.t('psychological.destination.consultation') }>
            <Competence name="Competence"
                        {...this.props.Competence}
                        applicantBirthdate={this.props.applicantBirthdate}
                        addressBooks={this.props.AddressBooks}
                        dispatch={this.props.dispatch}
                        onError={this.handleError}
                        onUpdate={this.handleUpdate.bind(this, 'Competence')}
                        scrollToBottom={this.props.scrollToBottom}
                        />
          </SectionView>

          <SectionView name="consultations"
                       back="psychological/competence"
                       backLabel={ i18n.t('psychological.destination.competence') }
                       next="psychological/hospitalizations"
                       nextLabel={ i18n.t('psychological.destination.hospitalization') }>
            <Consultation name="Consultations"
                          {...this.props.Consultations}
                          applicantBirthdate={this.props.applicantBirthdate}
                          addressBooks={this.props.AddressBooks}
                          dispatch={this.props.dispatch}
                          onError={this.handleError}
                          onUpdate={this.handleUpdate.bind(this, 'Consultations')}
                          scrollToBottom={this.props.scrollToBottom}
                          />
          </SectionView>
          <SectionView name="hospitalizations"
                       back="psychological/consultations"
                       backLabel={ i18n.t('psychological.destination.consultation') }
                       next="psychological/diagnoses"
                       nextLabel={ i18n.t('psychological.destination.diagnoses') }>
            <Hospitalizations name="Hospitalizations"
                              {...this.props.Hospitalizations}
                              applicantBirthdate={this.props.applicantBirthdate}
                              dispatch={this.props.dispatch}
                              onError={this.handleError}
                              onUpdate={this.handleUpdate.bind(this, 'Hospitalizations')}
                              scrollToBottom={this.props.scrollToBottom}
                              />
          </SectionView>
          <SectionView name="diagnoses"
                       back="psychological/hospitalizations"
                       backLabel={ i18n.t('psychological.destination.hospitalization') }
                       next={this.diagnosesNext()}
                       nextLabel={this.diagnosesNextLabel()}>
            <Diagnoses name="Diagnoses"
                       {...this.props.Diagnoses}
                       applicantBirthdate={this.props.applicantBirthdate}
                       addressBooks={this.props.AddressBooks}
                       dispatch={this.props.dispatch}
                       onError={this.handleError}
                       onUpdate={this.handleUpdate.bind(this, 'Diagnoses')}
                       scrollToBottom={this.props.scrollToBottom}
                       />
          </SectionView>
          <SectionView name="conditions"
                       back="psychological/diagnoses"
                       backLabel={ i18n.t('psychological.destination.diagnoses') }
                       next="psychological/review"
                       nextLabel={ i18n.t('psychological.destination.review') }>
            <ExistingConditions name="ExistingConditions"
                                {...this.props.ExistingConditions}
                                applicantBirthdate={this.props.applicantBirthdate}
                                dispatch={this.props.dispatch}
                                onError={this.handleError}
                                onUpdate={this.handleUpdate.bind(this, 'ExistingConditions')}
                                scrollToBottom={this.props.scrollToBottom}
                                />
          </SectionView>
          <SectionView name="review"
                       title={i18n.t('review.title')}
                       para={i18n.m('review.para')}
                       showTop={true}
                       back={this.props.ShowExistingConditions ? 'psychological/conditions' : 'psychological/diagnoses'}
                       backLabel={i18n.t(this.props.ShowExistingConditions ? 'psychological.destination.existingConditions' : 'psychological.destination.diagnoses')}
                       next="submit"
                       nextLabel={ i18n.t('submission.destination.submit') }>

            <Competence name="Competence"
                        {...this.props.Competence}
                        applicantBirthdate={this.props.applicantBirthdate}
                        defaultState={false}
                        dispatch={this.props.dispatch}
                        onError={this.handleError}
                        required={true}
                        scrollIntoView={false}
                        onUpdate={this.handleUpdate.bind(this, 'Competence')} />

            <hr className="section-divider" />
            <Consultation name="Consultations"
                          {...this.props.Consultations}
                          applicantBirthdate={this.props.applicantBirthdate}
                          defaultState={false}
                          dispatch={this.props.dispatch}
                          onError={this.handleError}
                          required={true}
                          scrollIntoView={false}
                          onUpdate={this.handleUpdate.bind(this, 'Consultations')} />

            <hr className="section-divider" />
            <Hospitalizations name="Hospitalizations"
                              {...this.props.Hospitalizations}
                              applicantBirthdate={this.props.applicantBirthdate}
                              defaultState={false}
                              dispatch={this.props.dispatch}
                              onError={this.handleError}
                              required={true}
                              scrollIntoView={false}
                              onUpdate={this.handleUpdate.bind(this, 'Hospitalizations')} />

            <hr className="section-divider" />
            <Diagnoses name="Diagnoses"
                       {...this.props.Diagnoses}
                       applicantBirthdate={this.props.applicantBirthdate}
                       defaultState={false}
                       dispatch={this.props.dispatch}
                       onError={this.handleError}
                       required={true}
                       scrollIntoView={false}
                       onUpdate={this.handleUpdate.bind(this, 'Diagnoses')}
                       />

            <Show when={this.props.ShowExistingConditions}>
              <div>
                <hr className="section-divider" />
                <ExistingConditions name="ExistingConditions"
                                    {...this.props.ExistingConditions}
                                    applicantBirthdate={this.props.applicantBirthdate}
                                    defaultState={false}
                                    dispatch={this.props.dispatch}
                                    onError={this.handleError}
                                    onUpdate={this.handleUpdate.bind(this, 'ExistingConditions')}
                                    required={this.props.ShowExistingConditions}
                                    scrollIntoView={false}
                                    />
              </div>
            </Show>

            <hr className="section-divider" />
            <SectionComments name="comments"
                             {...this.props.Comments}
                             title={i18n.t('psychological.review.comments')}
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
  const psychological = app.Psychological || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const addressBooks = app.AddressBooks || {}

  return {
    Psychological: psychological,
    Competence: psychological.Competence,
    Consultations: psychological.Consultations,
    Hospitalizations: psychological.Hospitalizations,
    Diagnoses: psychological.Diagnoses,
    ExistingConditions: psychological.ExistingConditions,
    Comments: psychological.Comments || {},
    Errors: errors.financial || [],
    Completed: completed.psychological || [],
    ShowExistingConditions: showQuestion21E(psychological),
    applicantBirthdate: extractApplicantBirthdate(app),
    AddressBooks: addressBooks
  }
}

Psychological.defaultProps = {
  section: 'psychological',
  store: 'Psychological',
  scrollToBottom: SectionView.BottomButtonsSelector
}

export class PsychologicalSections extends React.Component {
  render () {
    const showExisting = showQuestion21E(this.props)
    return (
      <div>
        <Competence name="Competence"
                    {...this.props.Competence}
                    applicantBirthdate={this.props.applicantBirthdate}
                    defaultState={false}
                    dispatch={this.props.dispatch}
                    onError={this.props.onError}
                    required={true}
                    scrollIntoView={false}
                    />

        <hr className="section-divider" />
        <Consultation name="Consultations"
                      {...this.props.Consultations}
                      applicantBirthdate={this.props.applicantBirthdate}
                      defaultState={false}
                      dispatch={this.props.dispatch}
                      onError={this.props.onError}
                      required={true}
                      scrollIntoView={false}
                      />

        <hr className="section-divider" />
        <Hospitalizations name="Hospitalizations"
                          {...this.props.Hospitalizations}
                          applicantBirthdate={this.props.applicantBirthdate}
                          defaultState={false}
                          dispatch={this.props.dispatch}
                          onError={this.props.onError}
                          required={true}
                          scrollIntoView={false}
                          />

        <hr className="section-divider" />
        <Diagnoses name="Diagnoses"
                   {...this.props.Diagnoses}
                   applicantBirthdate={this.props.applicantBirthdate}
                   defaultState={false}
                   dispatch={this.props.dispatch}
                   onError={this.props.onError}
                   required={true}
                   scrollIntoView={false}
                   />

        <Show when={showExisting}>
          <div>
            <hr className="section-divider" />
            <ExistingConditions name="ExistingConditions"
                                {...this.props.ExistingConditions}
                                applicantBirthdate={this.props.applicantBirthdate}
                                defaultState={false}
                                dispatch={this.props.dispatch}
                                onError={this.props.onError}
                                required={this.props.required}
                                scrollIntoView={false}
                                />
          </div>
        </Show>

        <hr className="section-divider" />
        <SectionComments name="comments"
                         {...this.props.Comments}
                         title={i18n.t('psychological.review.comments')}
                         dispatch={this.props.dispatch}
                         onError={this.handleError}
                         required={false}
                         scrollIntoView={false}
                         />
      </div>
    )
  }
}

export default connect(mapStateToProps)(AuthenticatedView(Psychological))
