import React from 'react'
import { i18n } from '../../../../../config'
import schema from '../../../../../schema'
import validate from '../../../../../validators'
import { Summary, DateSummary } from '../../../../Summary'
import { Accordion, Branch, Show } from '../../../../Form'
import { ForeignBenefitValidator } from '../../../../../validators'
import SubsectionElement from '../../../SubsectionElement'
import Benefit from './Benefit'

export default class BenefitActivity extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasBenefits = this.updateHasBenefits.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasBenefits: this.props.HasBenefits,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  updateHasBenefits (values) {
    this.update({
      HasBenefits: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  summary (item, index) {
    const o = (item || {}).Item || {}
    const benefit = {}
    const who = ((o.InterestTypes || {}).values || []).join(', ')

    let b = null
    switch (o.BenefitFrequency) {
      case 'OneTime':
        b = (o.OneTimeBenefit || {})
        benefit.Country = (b.Country || {}).value
        benefit.Date = DateSummary(b.Received)
        break
      case 'Future':
        b = (o.FutureBenefit || {})
        benefit.Country = (b.Country || {}).value
        benefit.Date = DateSummary(b.Begin)
        break
      case 'Continuing':
        b = (o.ContinuingBenefit || {})
        benefit.Country = (b.Country || {}).value
        benefit.Date = DateSummary(b.Began)
        break
    }

    const summary = [who, benefit.Country].reduce((prev, next) => {
      if (prev && next) {
        return prev + ' - ' + next
      }
      return prev
    })

    return Summary({
      type: i18n.t('foreign.activities.benefit.collection.itemType'),
      index: index,
      left: summary,
      right: benefit.Date,
      placeholder: i18n.m('foreign.activities.benefit.collection.summary')
    })
  }

  render () {
    return (
      <div className="benefit-activity">
        <Branch name="has_benefit"
                className="has-benefits"
                label={i18n.t('foreign.activities.benefit.heading.title')}
                labelSize="h2"
                {...this.props.HasBenefits}
                warning={true}
                onError={this.handleError}
                required={this.props.required}
                onUpdate={this.updateHasBenefits}
                scrollIntoView={this.props.scrollIntoView}>
        </Branch>

        <Show when={this.props.HasBenefits.value === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     {...this.props.List}
                     scrollToBottom={this.props.scrollToBottom}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     validator={ForeignBenefitValidator}
                     description={i18n.t('foreign.activities.benefit.collection.description')}
                     appendTitle={i18n.t('foreign.activities.benefit.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.activities.benefit.collection.appendLabel')}
                     required={this.props.required}
                     scrollIntoView={this.props.scrollIntoView}>
            <Benefit name="Item"
                     bind={true}
                     required={this.props.required}
                     applicantBirthdate={this.props.applicantBirthdate}
                     scrollIntoView={this.props.scrollIntoView}
                     />
          </Accordion>
        </Show>
      </div>
    )
  }
}

BenefitActivity.defaultProps = {
  name: 'benefit',
  HasBenefits: {},
  List: {},
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'activities/benefits',
  applicantBirthdate: {},
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('foreign.activities.benefits', props))
  },
  scrollToBottom: ''
}

export const benefitSummary = (item, index) => {
}
