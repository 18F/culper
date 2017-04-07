import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, ValidationElement, Branch, Show } from '../../../Form'
import Diagnosis from './Diagnosis'
import Treatment from '../Treatment'
import { DiagnosesValidator } from '../../../../validators'

export default class Diagnoses extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Diagnosed: props.Diagnosed,
      DidNotConsult: props.DidNotConsult,
      InTreatment: props.InTreatment,
      DiagnosisList: props.DiagnosisList,
      TreatmentList: props.TreatmentList,
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateDiagnosed = this.updateDiagnosed.bind(this)
    this.updateDidNotConsult = this.updateDidNotConsult.bind(this)
    this.updateInTreatment = this.updateInTreatment.bind(this)
    this.updateDiagnosisList = this.updateDiagnosisList.bind(this)
    this.updateTreatmentList = this.updateTreatmentList.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Diagnosed: this.state.Diagnosed,
          DidNotConsult: this.state.DidNotConsult,
          InTreatment: this.state.InTreatment,
          DiagnosisList: this.state.DiagnosisList,
          TreatmentList: this.state.TreatmentList
        })
      }
    })
  }

  updateDiagnosisList (values) {
    this.update('DiagnosisList', values)
  }

  updateTreatmentList (values) {
    this.update('TreatmentList', values)
  }

  updateDiagnosed (values) {
    this.update('Diagnosed', values)
  }

  updateDidNotConsult (values) {
    this.update('DidNotConsult', values)
  }

  updateInTreatment (values) {
    this.update('InTreatment', values)
  }

  handleValidation (event, status, error) {
    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const errorObject = { [this.props.name]: codes }
      const statusObject = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, statusObject, errorObject)
    })
  }

  summary (item, index) {
    const o = (item || {}).Diagnosis || {}
    const date = (o.Diagnosed || {}).from ? `${o.Diagnosed.from.month}/${o.Diagnosed.from.year}` : ''
    const facility = (o.Condition || {}).value ? `${o.Condition.value} ${date}` : i18n.t('psychological.diagnoses.collection.summary')
    const type = i18n.t('psychological.diagnoses.collection.itemType')

    return (
      <span>
        <span className="index">{type}</span>
        <span className="info"><strong>{facility}</strong></span>
      </span>
    )
  }

  treatmentSummary (item, index) {
    const o = (item || {}).Treatment || {}
    const name = (o.Name || {}).value ? `${o.Name.value}` : i18n.t('psychological.diagnoses.treatment.collection.summary')
    const type = i18n.t('psychological.diagnoses.treatment.collection.itemType')

    return (
      <span>
        <span className="index">{type}</span>
        <span className="info"><strong>{name}</strong></span>
      </span>
    )
  }

  isValid () {
    return new DiagnosesValidator(this.state).isValid()
  }

  render () {
    return (
      <div className="diagnoses">
        {i18n.m('psychological.heading.diagnoses')}
        <h3>{i18n.t('psychological.diagnoses.heading.para')}</h3>
        <Branch name="diagnosed"
          className="eapp-field-wrap no-label diagnosed"
          value={this.state.Diagnosed}
          help="psychological.diagnoses.help.incompetent"
          onUpdate={this.updateDiagnosed}>
        </Branch>

        <Show when={this.state.Diagnosed === 'Yes'}>
          <Accordion minimum="1"
            items={this.state.DiagnosisList}
            onUpdate={this.updateDiagnosisList}
            summary={this.summary}
            onValidate={this.handleValidation}
            appendTitle={i18n.t('psychological.diagnoses.collection.appendTitle')}
            appendMessage={i18n.m('psychological.diagnoses.collection.appendMessage')}
            appendLabel={i18n.t('psychological.diagnoses.collection.appendLabel')}>
            <Diagnosis name="Diagnosis"
              bind={true} />
          </Accordion>
        </Show>

        <h3>{i18n.t('psychological.diagnoses.heading.didNotConsult')}</h3>
        <Branch name="didNotConsult"
          className="eapp-field-wrap no-label didnotconsult"
          value={this.state.DidNotConsult}
          help="psychological.diagnoses.help.didNotConsult"
          onUpdate={this.updateDidNotConsult}>
        </Branch>

        <h3>{i18n.t('psychological.diagnoses.heading.inTreatment')}</h3>
        <Branch name="inTreatment"
          className="eapp-field-wrap no-label intreatment"
          value={this.state.InTreatment}
          help="psychological.diagnoses.help.inTreatment"
          onUpdate={this.updateInTreatment}>
        </Branch>

        <Show when={this.state.InTreatment === 'Yes'}>
          <Accordion minimum="1"
            items={this.state.TreatmentList}
            onUpdate={this.updateTreatmentList}
            summary={this.treatmentSummary}
            onValidate={this.handleValidation}
            appendTitle={i18n.t('psychological.diagnoses.treatment.collection.appendTitle')}
            appendMessage={i18n.m('psychological.diagnoses.treatment.collection.appendMessage')}
            appendLabel={i18n.t('psychological.diagnoses.treatment.collection.appendLabel')}>
            <Treatment name="Treatment"
              prefix="diagnoses.professional"
              bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Diagnoses.defaultProps = {
  List: [],
  DiagnosisList: [],
  TreatmentList: []
}
