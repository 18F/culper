import React from 'react'
import { i18n } from '../../../../../config'
import { DateSummary } from '../../../../Summary'
import { Accordion, Branch, Show } from '../../../../Form'
import { ForeignBenefitActivityValidator } from '../../../../../validators'
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
      ListBranch: this.props.ListBranch,
      HasBenefits: this.props.HasBenefits,
      ...queue
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  updateHasBenefits (values) {
    this.update({
      HasBenefits: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).Benefit || {}
    return benefitSummary(o, index)
  }

  render () {
    return (
      <div className="benefit-activity">
        <Branch name="has_benefit"
                className="has-benefits"
                label={i18n.t('foreign.activities.benefit.heading.title')}
                labelSize="h3"
                value={this.props.HasBenefits}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateHasBenefits}>
        </Branch>

        <Show when={this.props.HasBenefits === 'Yes'}>
          <Accordion defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     description={i18n.t('foreign.activities.benefit.collection.description')}
                     appendTitle={i18n.t('foreign.activities.benefit.collection.appendTitle')}
                     appendLabel={i18n.t('foreign.activities.benefit.collection.appendLabel')}>
            <Benefit name="Benefit"
                     bind={true}
                     />
          </Accordion>
        </Show>
      </div>
    )
  }
}

BenefitActivity.defaultProps = {
  name: 'benefit',
  HasBenefits: '',
  List: [],
  ListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'activities/benefits',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignBenefitActivityValidator(state, props).isValid()
  }
}

export const benefitSummary = (item, index) => {
  const benefit = {}
  const who = (item.InterestTypes || []).join(', ')
  const type = i18n.t('foreign.activities.benefit.collection.itemType')
  let b = null
  switch (item.BenefitFrequency) {
    case 'OneTime':
      b = (item.OneTimeBenefit || {})
      benefit.Country = (b.Country || {}).value
      benefit.Date = DateSummary(b.Received)
      break
    case 'Future':
      b = (item.FutureBenefit || {})
      benefit.Country = (b.Country || {}).value
      benefit.Date = DateSummary(b.Begin)
      break
    case 'Continuing':
      b = (item.ContinuingBenefit || {})
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

  return (
    <span className="content">
      <span className="index">{type}: {index + 1}</span>
      <span className="benefit-summary">
        <strong>{ summary || benefit.Date === '' ? i18n.m('foreign.activities.benefit.collection.summary') : ''}</strong>
      </span>
      <span className="date"><strong>{benefit.Date}</strong></span>
    </span>
  )
}
