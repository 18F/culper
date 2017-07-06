import React from 'react'
import { i18n } from '../../../../config'
import { DiagnosesValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show, Field } from '../../../Form'
import Diagnosis from './Diagnosis'
import Treatment from '../Treatment'
import { dateRangeFormat } from '../summaryHelper'

export default class Diagnoses extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDiagnosed = this.updateDiagnosed.bind(this)
    this.updateDidNotConsult = this.updateDidNotConsult.bind(this)
    this.updateInTreatment = this.updateInTreatment.bind(this)
    this.updateDiagnosisList = this.updateDiagnosisList.bind(this)
    this.updateTreatmentList = this.updateTreatmentList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Diagnosed: this.props.Diagnosed,
      DidNotConsult: this.props.DidNotConsult,
      InTreatment: this.props.InTreatment,
      DiagnosisList: this.props.DiagnosisList,
      DiagnosisListBranch: this.props.DiagnosisListBranch,
      TreatmentList: this.props.TreatmentList,
      TreatmentListBranch: this.props.TreatmentListBranch,
      ...queue
    })
  }

  updateDiagnosisList (values) {
    this.update({
      DiagnosisList: values.items,
      DiagnosisListBranch: values.branch
    })
  }

  updateTreatmentList (values) {
    this.update({
      TreatmentList: values.items,
      TreatmentListBranch: values.branch
    })
  }

  updateDiagnosed (values) {
    this.update({
      Diagnosed: values,
      DiagnosisList: values === 'Yes' ? this.props.DiagnosisList : [],
      DiagnosisListBranch: values === 'Yes' ? this.props.DiagnosisListBranch : '',
      DidNotConsult: values === 'Yes' ? this.props.DidNotConsult : '',
      InTreatment: values === 'Yes' ? this.props.InTreatment : '',
      TreatmentList: values === 'Yes' ? this.props.TreatmentList : [],
      TreatmentListBranch: values === 'Yes' ? this.props.TreatmentListBranch : ''
    })
  }

  updateDidNotConsult (values) {
    this.update({
      DidNotConsult: values
    })
  }

  updateInTreatment (values) {
    this.update({
      InTreatment: values,
      TreatmentList: values === 'Yes' ? this.props.TreatmentList : [],
      TreatmentListBranch: values === 'Yes' ? this.props.TreatmentListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).Diagnosis || {}
    const date = (o.Diagnosed || {})
    const diagnosisDate = dateRangeFormat(date)
    const facility = (o.Condition || {}).value ? o.Condition.value : null
    const type = i18n.t('psychological.diagnoses.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span>
          <strong>{facility || i18n.m('psychological.diagnoses.collection.summary')}</strong>
        </span>
        <span className="diagnosisdate"><strong>{facility && diagnosisDate}</strong></span>
      </span>
    )
  }

  treatmentSummary (item, index) {
    const o = (item || {}).Treatment || {}
    const name = (o.Name || {}).value ? `${o.Name.value}` : i18n.m('psychological.diagnoses.treatment.collection.summary')
    const type = i18n.t('psychological.diagnoses.treatment.collection.itemType')

    return (
      <span>
        <span className="index">{type} {index + 1}:</span>
        <span className="info"><strong>{name}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="diagnoses">
        <div>
          {i18n.m('psychological.heading.diagnoses')}
        </div>
        <Field title={i18n.t('psychological.diagnoses.heading.diagnoses')}>
          <p>{i18n.t('psychological.diagnoses.heading.examples')}</p>
          <Branch name="diagnosed"
                  className="diagnosed"
                  value={this.props.Diagnosed}
                  warning={true}
                  onError={this.handleError}
                  onUpdate={this.updateDiagnosed}>
          </Branch>
        </Field>
        <Show when={this.props.Diagnosed === 'Yes'}>
          <div>
            <Accordion className="diagnosis-collection"
                       defaultState={this.props.defaultState}
                       items={this.props.DiagnosisList}
                       branch={this.props.DiagnosisListBranch}
                       onUpdate={this.updateDiagnosisList}
                       summary={this.summary}
                       onError={this.handleError}
                       description={i18n.t('psychological.diagnoses.collection.description')}
                       appendTitle={i18n.t('psychological.diagnoses.collection.appendTitle')}
                       appendMessage={i18n.m('psychological.diagnoses.collection.appendMessage')}
                       appendLabel={i18n.t('psychological.diagnoses.collection.appendLabel')}>
              <Diagnosis name="Diagnosis"
                         ApplicantBirthDate={this.props.ApplicantBirthDate}
                         bind={true} />
            </Accordion>

            <h3>{i18n.t('psychological.diagnoses.heading.didNotConsult')}</h3>
            <Branch name="didNotConsult"
                    className="didnotconsult"
                    value={this.props.DidNotConsult}
                    help="psychological.diagnoses.help.didNotConsult"
                    onError={this.handleError}
                    onUpdate={this.updateDidNotConsult}>
            </Branch>

            <h3>{i18n.t('psychological.diagnoses.heading.inTreatment')}</h3>
            <Branch name="inTreatment"
                    className="intreatment"
                    value={this.props.InTreatment}
                    help="psychological.diagnoses.help.inTreatment"
                    warning={true}
                    onError={this.handleError}
                    onUpdate={this.updateInTreatment}>
            </Branch>

            <Show when={this.props.InTreatment === 'Yes'}>
              <Accordion defaultState={this.props.defaultState}
                         items={this.props.TreatmentList}
                         branch={this.props.TreatmentListBranch}
                         onUpdate={this.updateTreatmentList}
                         summary={this.treatmentSummary}
                         onError={this.handleError}
                         appendTitle={i18n.t('psychological.diagnoses.treatment.collection.appendTitle')}
                         appendLabel={i18n.t('psychological.diagnoses.treatment.collection.appendLabel')}>
                <Treatment name="Treatment"
                           prefix="diagnoses.professional"
                           bind={true} />
              </Accordion>
            </Show>
          </div>
        </Show>

      </div>
    )
  }
}

Diagnoses.defaultProps = {
  List: [],
  DiagnosisList: [],
  DiagnosisListBranch: '',
  TreatmentList: [],
  TreatmentListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'diagnoses',
  dispatch: () => {},
  validator: (state, props) => {
    return new DiagnosesValidator(props, props).isValid()
  }
}
