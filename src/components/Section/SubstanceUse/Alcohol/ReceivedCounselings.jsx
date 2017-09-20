import React from 'react'
import { i18n } from '../../../../config'
import schematize from '../../../../schema'
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
    this.update({
      ReceivedTreatment: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
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
      placeholder: i18n.m('substance.alcohol.receivedCounseling.collection.summary')
    })
  }

  render () {
    return (
      <div className="received-counselings">
        <Branch name="ReceivedTreatment"
                label={i18n.t('substance.alcohol.heading.receivedCounseling')}
                labelSize="h2"
                className="received-treatment"
                value={this.props.ReceivedTreatment}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateReceivedTreatment}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.ReceivedTreatment === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={ReceivedCounselingValidator}
                     description={i18n.t('substance.alcohol.receivedCounseling.collection.description')}
                     appendTitle={i18n.t('substance.alcohol.receivedCounseling.collection.appendTitle')}
                     appendLabel={i18n.t('substance.alcohol.receivedCounseling.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <ReceivedCounseling name="Item" bind={true} required={this.props.required} scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

ReceivedCounselings.defaultProps = {
  List: [],
  ListBranch: '',
  onError: (value, arr) => { return arr },
  section: 'substance',
  subsection: 'alcohol/additional',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schematize('substance.alcohol.additional', props))
  },
  scrollToBottom: ''
}
