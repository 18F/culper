import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, ValidationElement, Branch, Show } from '../../../Form'
import Hospitalization from './Hospitalization'
import { HospitalizationsValidator } from '../../../../validators'
import { dateRangeFormat } from '../summaryHelper'

export default class Hospitalizations extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      Hospitalized: props.Hospitalized,
      List: props.List,
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateHospitalized = this.updateHospitalized.bind(this)
    this.updateList = this.updateList.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Hospitalized: this.state.Hospitalized,
          List: this.state.List
        })
      }
    })
  }

  updateList (values) {
    this.update('List', values)
  }

  updateHospitalized (values) {
    this.update('Hospitalized', values)
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
    const o = (item || {}).Hospitalization || {}
    const treatmentDate = (o.TreatmentDate || {})
    const formattedTreatmentDate = dateRangeFormat(treatmentDate)
    const facility = (o.Facility || {}).value ? o.Facility.value : null
    const type = i18n.t('psychological.hospitalization.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="facility">
          <strong>{facility || i18n.t('psychological.hospitalization.collection.summary')}</strong>
        </span>
        <span className="treatmentdate"><strong>{facility && formattedTreatmentDate}</strong></span>
      </span>
    )
  }

  isValid () {
    return new HospitalizationsValidator(this.state).isValid()
  }

  render () {
    return (
      <div className="hospitalizations">
        <h2>{i18n.t('psychological.heading.hospitalization')}</h2>
        <Branch name="hospitalized"
          value={this.state.Hospitalized}
          onValidate={this.handleValidation}
          onUpdate={this.updateHospitalized}>
        </Branch>

        <Show when={this.state.Hospitalized === 'Yes'}>
          <Accordion minimum="1"
            defaultState={this.props.defaultState}
            items={this.state.List}
            onUpdate={this.updateList}
            summary={this.summary}
            onValidate={this.handleValidation}
            description={i18n.t('psychological.hospitalization.collection.description')}
            appendTitle={i18n.t('psychological.hospitalization.collection.appendTitle')}
            appendMessage={i18n.m('psychological.hospitalization.collection.appendMessage')}
            appendLabel={i18n.t('psychological.hospitalization.collection.appendLabel')}>
            <Hospitalization name="Hospitalization"
              ApplicantBirthDate={this.props.ApplicantBirthDate}
              bind={true}
            />
          </Accordion>

        </Show>
      </div>
    )
  }
}

Hospitalization.defaultProps = {
  List: [],
  defaultState: true
}
