import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import { Summary, NameSummary, DateSummary } from '../../../Summary'
import validate, {
  DiagnosisValidator,
  TreatmentValidator
} from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Diagnosis from './Diagnosis'
import Treatment from '../Treatment'

export default class Diagnoses extends SubsectionElement {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDiagnosed = this.updateDiagnosed.bind(this)
    this.updateDidNotConsult = this.updateDidNotConsult.bind(this)
    this.updateInTreatment = this.updateInTreatment.bind(this)
    this.updateDiagnosisList = this.updateDiagnosisList.bind(this)
    this.updateTreatmentList = this.updateTreatmentList.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      Diagnosed: this.props.Diagnosed,
      DidNotConsult: this.props.DidNotConsult,
      InTreatment: this.props.InTreatment,
      DiagnosisList: this.props.DiagnosisList,
      TreatmentList: this.props.TreatmentList,
      ...queue
    })
  }

  updateDiagnosisList(values) {
    this.update({
      DiagnosisList: values
    })
  }

  updateTreatmentList(values) {
    this.update({
      TreatmentList: values
    })
  }

  updateDiagnosed(values) {
    this.update({
      Diagnosed: values,
      DiagnosisList: values.value === 'Yes' ? this.props.DiagnosisList : [],
      DidNotConsult: values.value === 'Yes' ? this.props.DidNotConsult : '',
      InTreatment: values.value === 'Yes' ? this.props.InTreatment : '',
      TreatmentList: values.value === 'Yes' ? this.props.TreatmentList : []
    })
  }

  updateDidNotConsult(values) {
    this.update({
      DidNotConsult: values
    })
  }

  updateInTreatment(values) {
    this.update({
      InTreatment: values,
      TreatmentList: values.value === 'Yes' ? this.props.TreatmentList : []
    })
  }

  summary(item, index) {
    const o = (item || {}).Diagnosis || {}
    const date = o.Diagnosed || {}
    // const diagnosisDate = dateRangeFormat(date)
    const diagnosisDate = DateSummary(date)
    const facility = (o.Condition || {}).value || ''

    return Summary({
      type: i18n.t('psychological.diagnoses.collection.itemType'),
      index: index,
      left: facility,
      right: diagnosisDate,
      placeholder: i18n.t('psychological.diagnoses.collection.summary')
    })
  }

  treatmentSummary(item, index) {
    const o = (item || {}).Treatment || {}
    const name = (o.Name || {}).value || ''

    return Summary({
      type: i18n.t('psychological.diagnoses.treatment.collection.itemType'),
      index: index,
      left: name,
      placeholder: i18n.t(
        'psychological.diagnoses.treatment.collection.summary'
      )
    })
  }

  render() {
    return (
      <div
        className="section-content diagnoses"
        {...super.dataAttributes(this.props)}>
        <h1 className="section-header">Diagnoses</h1>
        {i18n.m('psychological.heading.diagnoses')}
        <Branch
          name="diagnosed"
          label={i18n.t('psychological.diagnoses.heading.diagnoses')}
          labelSize="h4"
          className="diagnosed"
          {...this.props.Diagnosed}
          warning={true}
          onError={this.handleError}
          onUpdate={this.updateDiagnosed}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('psychological.diagnoses.heading.examples')}
        </Branch>
        <Show when={this.props.Diagnosed.value === 'Yes'}>
          <div>
            <Accordion
              className="diagnosis-collection"
              defaultState={this.props.defaultState}
              {...this.props.DiagnosisList}
              onUpdate={this.updateDiagnosisList}
              summary={this.summary}
              onError={this.handleError}
              validator={DiagnosisValidator}
              description={i18n.t(
                'psychological.diagnoses.collection.description'
              )}
              appendTitle={i18n.t(
                'psychological.diagnoses.collection.appendTitle'
              )}
              appendMessage={i18n.m(
                'psychological.diagnoses.collection.appendMessage'
              )}
              appendLabel={i18n.t(
                'psychological.diagnoses.collection.appendLabel'
              )}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}>
              <Diagnosis
                name="Item"
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                addressBooks={this.props.addressBooks}
                dispatch={this.props.dispatch}
                bind={true}
              />
            </Accordion>

            <Branch
              name="didNotConsult"
              label={i18n.t('psychological.diagnoses.heading.didNotConsult')}
              labelSize="h4"
              className="didnotconsult"
              {...this.props.DidNotConsult}
              onError={this.handleError}
              required={this.props.required}
              onUpdate={this.updateDidNotConsult}
              scrollIntoView={this.props.scrollIntoView}
            />

            <Branch
              name="inTreatment"
              label={i18n.t('psychological.diagnoses.heading.inTreatment')}
              labelSize="h4"
              className="intreatment"
              {...this.props.InTreatment}
              warning={true}
              onError={this.handleError}
              required={this.props.required}
              onUpdate={this.updateInTreatment}
              scrollIntoView={this.props.scrollIntoView}
            />

            <Show when={this.props.InTreatment.value === 'Yes'}>
              <Accordion
                defaultState={this.props.defaultState}
                {...this.props.TreatmentList}
                scrollToBottom={this.props.scrollToBottom}
                onUpdate={this.updateTreatmentList}
                summary={this.treatmentSummary}
                onError={this.handleError}
                validator={TreatmentValidator}
                appendTitle={i18n.t(
                  'psychological.diagnoses.treatment.collection.appendTitle'
                )}
                appendLabel={i18n.t(
                  'psychological.diagnoses.treatment.collection.appendLabel'
                )}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}>
                <Treatment
                  name="Item"
                  prefix="diagnoses.professional"
                  addressBooks={this.props.addressBooks}
                  dispatch={this.props.dispatch}
                  required={this.props.required}
                  scrollIntoView={this.props.scrollIntoView}
                  bind={true}
                />
              </Accordion>
            </Show>
          </div>
        </Show>
      </div>
    )
  }
}

Diagnoses.defaultProps = {
  List: {},
  Diagnosed: {},
  DidNotConsult: {},
  InTreatment: {},
  DiagnosisList: {},
  TreatmentList: {},
  defaultState: true,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'psychological',
  subsection: 'diagnoses',
  addressBooks: {},
  dispatch: () => {},
  validator: data => {
    return validate(schema('psychological.diagnoses', data))
  },
  scrollToBottom: ''
}
