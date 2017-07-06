import React from 'react'
import { i18n } from '../../../../config'
import { AlcoholReceivedCounselingsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import ReceivedCounseling from './ReceivedCounseling'
import { DateSummary } from '../../../Summary'

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
    const o = (item || {}).ReceivedCounseling || {}
    const counselor = o.TreatmentProviderName ? o.TreatmentProviderName.value : ''
    const counselingDates = DateSummary({
      from: o.TreatmentBeganDate,
      to: o.TreatmentEndDate
    })
    const type = i18n.t('substance.alcohol.receivedCounseling.collection.itemType')

    return (
      <span className="content">
        <span className="index">{type} {index + 1}:</span>
        <span className="occurred">
          <Show when={!counselor && !counselingDates}>
            <strong>{i18n.m('substance.alcohol.receivedCounseling.collection.summary')}</strong>
          </Show>
          <Show when={counselor || counselingDates}>
            <strong>{counselor}</strong>
          </Show>
        </span>
        <span className="dates"><strong>{counselingDates}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="received-counselings">
        <h2>{i18n.t('substance.alcohol.heading.receivedCounseling')}</h2>
        <Branch name="ReceivedTreatment"
                className="received-treatment"
                value={this.props.ReceivedTreatment}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateReceivedTreatment}>
        </Branch>

        <Show when={this.props.ReceivedTreatment === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('substance.alcohol.receivedCounseling.collection.description')}
                     appendTitle={i18n.t('substance.alcohol.receivedCounseling.collection.appendTitle')}
                     appendLabel={i18n.t('substance.alcohol.receivedCounseling.collection.appendLabel')}>
            <ReceivedCounseling name="ReceivedCounseling" bind={true} />
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
    return new AlcoholReceivedCounselingsValidator(props).isValid()
  }
}
