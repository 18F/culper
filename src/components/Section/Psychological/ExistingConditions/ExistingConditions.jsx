import React from 'react'
import { i18n } from '../../../../config'
import { Accordion, ValidationElement, Branch, Show } from '../../../Form'
import Treatment from '../Treatment'

export default class ExistingConditions extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasCondition: props.HasCondition,
      ReceivedTreatment: props.ReceivedTreatment,
      TreatmentList: props.TreatmentList,
      DidNotFollow: props.DidNotFollow,
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateHasCondition = this.updateHasCondition.bind(this)
    this.updateReceivedTreatment = this.updateReceivedTreatment.bind(this)
    this.updateTreatmentList = this.updateTreatmentList.bind(this)
    this.updateDidNotFollow = this.updateDidNotFollow.bind(this)
  }

  update (field, values) {
    this.setState({[field]: values}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasCondition: this.state.HasCondition,
          ReceivedTreatment: this.state.ReceivedTreatment,
          TreatmentList: this.state.TreatmentList,
          DidNotFollow: this.state.DidNotFollow
        })
      }
    })
  }

  updateHasCondition (values) {
    this.update('HasCondition', values)
  }

  updateReceivedTreatment (values) {
    this.update('ReceivedTreatment', values)
  }

  updateTreatmentList (values) {
    this.update('TreatmentList', values)
  }

  updateDidNotFollow (values) {
    this.update('DidNotFollow', values)
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
    const facility = (o.Condition || {}).value ? `${o.Condition.value} ${date}` : i18n.t('psychological.existingConditions.collection.summary')
    const type = i18n.t('psychological.existingConditions.collection.itemType')

    return (
      <span>
        <span className="index">{type}</span>
        <span className="info"><strong>{facility}</strong></span>
      </span>
    )
  }
  isValid () {
    return true
  }

  render () {
    return (
      <div className="existingconditions">
        <h3>{i18n.t('psychological.existingConditions.heading.hasCondition')}</h3>
        {i18n.m('psychological.existingConditions.para.hasCondition')}
        <Branch name="hascondition"
          className="eapp-field-wrap no-label hascondition"
          value={this.state.HasCondition}
          help="psychological.existingConditions.help.hasCondition"
          onUpdate={this.updateHasCondition}>
        </Branch>

        <h3>{i18n.t('psychological.existingConditions.heading.receivedTreatment')}</h3>
        {i18n.m('psychological.para.receivedTreatment')}
        <Branch name="hascondition"
          className="eapp-field-wrap no-label hascondition"
          value={this.state.HasCondition}
          help="psychological.existingConditions.help.hasCondition"
          onUpdate={this.updateHasCondition}>
        </Branch>

        <Show when={this.state.ReceivedTreatment === 'Yes'}>
          <Accordion minimum="1"
            items={this.state.TreatmentList}
            onUpdate={this.updateTreatmentList}
            summary={this.treatmentSummary}
            onValidate={this.handleValidation}
            appendTitle={i18n.t('psychological.existingConditions.treatment.collection.appendTitle')}
            appendMessage={i18n.m('psychological.existingConditions.treatment.collection.appendMessage')}
            appendLabel={i18n.t('psychological.existingConditions.treatment.collection.appendLabel')}>
            <Treatment name="Treatment"
              prefix="existingConditions"
              bind={true} />
          </Accordion>
        </Show>

        <h3>{i18n.t('psychological.existingConditions.heading.didNotFollow')}</h3>
        <Branch name="didNotFollow"
          className="eapp-field-wrap no-label didnotfollow"
          value={this.state.DidNotFollow}
          help="psychological.existingConditions.help.didNotFollow"
          onUpdate={this.updateDidNotFollow}>
        </Branch>
      </div>
    )
  }
}

ExistingConditions.defaultProps = {
  TreatmentList: []
}
