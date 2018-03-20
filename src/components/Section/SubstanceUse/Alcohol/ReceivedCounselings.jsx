import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { AlcoholReceivedCounselingsValidator, ReceivedCounselingValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import ReceivedCounseling from './ReceivedCounseling'
import { Summary, DateSummary } from '../../../Summary'

export default class ReceivedCounselings extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateReceivedTreatment = this.updateReceivedTreatment.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        ReceivedTreatment: this.props.ReceivedTreatment,
        List: this.props.List,
        ...updateValues
      })
    }
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  updateReceivedTreatment (values) {
    this.update({
      ReceivedTreatment: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const counselor = o.TreatmentProviderName ? o.TreatmentProviderName.value : ''
    const counselingDates = DateSummary({
      from: o.TreatmentBeganDate,
      to: o.TreatmentEndDate
    })

    return Summary({
      type: i18n.t('substance.alcohol.receivedCounseling.collection.itemType'),
      index: index,
      left: counselor,
      right: counselingDates,
      placeholder: i18n.t('substance.alcohol.receivedCounseling.collection.summary')
    })
  }

  render () {
    return (
      <div className="section-content received-counselings" {...super.dataAttributes(this.props)}>
        <Branch name="ReceivedTreatment"
                label={i18n.t('substance.alcohol.heading.receivedCounseling')}
                labelSize="h2"
                className="received-treatment"
                {...this.props.ReceivedTreatment}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateReceivedTreatment}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.ReceivedTreatment.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={ReceivedCounselingValidator}
                     description={i18n.t('substance.alcohol.receivedCounseling.collection.description')}
                     appendTitle={i18n.t('substance.alcohol.receivedCounseling.collection.appendTitle')}
                     appendLabel={i18n.t('substance.alcohol.receivedCounseling.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <ReceivedCounseling name="Item"
                                bind={true}
                                required={this.props.required}
                                scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

ReceivedCounselings.defaultProps = {
  ReceivedTreatment: {},
  List: Accordion.defaultList,
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'alcohol/additional',
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('substance.alcohol.additional', data))
  },
  scrollToBottom: ''
}
