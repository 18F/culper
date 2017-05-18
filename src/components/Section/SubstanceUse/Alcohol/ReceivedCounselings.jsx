import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Accordion, Branch, Show } from '../../../Form'
import ReceivedCounseling from './ReceivedCounseling'
import { DateSummary } from '../../../Summary'
import { AlcoholReceivedCounselingsValidator } from '../../../../validators'

export default class ReceivedCounselings extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      errorCodes: props.ErrorCodes || []
    }

    this.update = this.update.bind(this)
    this.updateReceivedTreatment = this.updateReceivedTreatment.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        ReceivedTreatment: this.props.ReceivedTreatment,
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        ...updateValues
      })
    }
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateReceivedTreatment (values) {
    this.update({ReceivedTreatment: values})
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
    const o = (item || {}).NegativeImpact || {}
    const occurred = DateSummary(o.Occurred)
    const type = i18n.t('substance.alcohol.receivedCounseling.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="occurred">
          <strong>
            {occurred || i18n.t('substance.alcohol.receivedCounseling.collection.summary')}
          </strong>
        </span>
      </span>
    )
  }

  isValid () {
    return new AlcoholReceivedCounselingsValidator(this.props).isValid()
  }

  render () {
    return (
      <div className="received-counselings">
        <h2>{i18n.t('substance.alcohol.heading.receivedCounseling')}</h2>
        <Branch name="ReceivedTreatment"
          className="received-treatment"
          value={this.props.ReceivedTreatment}
          onValidate={this.handleValidation}
          onUpdate={this.updateReceivedTreatment}>
        </Branch>

        <Show when={this.props.ReceivedTreatment === 'Yes'}>
          <Accordion minimum="1"
            defaultState={this.props.defaultState}
            items={this.props.List}
            branch={this.props.ListBranch}
            summary={this.summary}
            onUpdate={this.updateList}
            onValidate={this.handleValidation}
            description={i18n.t('substance.alcohol.receivedCounseling.collection.description')}
            appendTitle={i18n.t('substance.alcohol.receivedCounseling.collection.appendTitle')}
            appendLabel={i18n.t('substance.alcohol.receivedCounseling.collection.appendLabel')}>
            <ReceivedCounseling name="ReceivedCounseling"
              bind={true} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

ReceivedCounselings.defaultProps = {
  List: [],
  ListBranch: ''
}
