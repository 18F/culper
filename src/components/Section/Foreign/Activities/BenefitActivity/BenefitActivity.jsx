import React from 'react'
import { i18n } from '../../../../../config'
import { Accordion, ValidationElement, Branch, Show } from '../../../../Form'
import { ForeignBenefitActivityValidator } from '../../../../../validators'
import Benefit from './Benefit'

export default class BenefitActivity extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      errorCodes: []
    }

    this.update = this.update.bind(this)
    this.updateHasBenefits = this.updateHasBenefits.bind(this)
    this.updateList = this.updateList.bind(this)
    this.isValid = this.isValid.bind(this)
  }

  update (field, values) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        HasBenefits: this.props.HasBenefits,
        List: this.props.List,
        ListBranch: this.props.ListBranch,
        [field]: values
      })
    }
  }

  updateList (values) {
    this.update('List', values.items)
    this.update('ListBranch', values.branch)
  }

  updateHasBenefits (values) {
    this.update('HasBenefits', values)
  }

  isValid () {
    return new ForeignBenefitActivityValidator(null, this.props).isValid()
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
    const o = (item || {}).Benefit || {}
    return benefitSummary(o, index)
  }

  render () {
    return (
      <div className="benefit-activity">
        <Branch name="has_benefit"
                help="foreign.activities.benefit.help.benefit"
                className="has-benefits"
                label={i18n.t('foreign.activities.benefit.heading.title')}
                labelSize="h3"
                value={this.props.HasBenefits}
                onValidate={this.handleValidation}
                onUpdate={this.updateHasBenefits}>
        </Branch>

        <Show when={this.props.HasBenefits === 'Yes'}>
          <Accordion minimum="1"
                     defaultState={this.props.defaultState}
                     items={this.props.List}
                     branch={this.props.ListBranch}
                     summary={this.summary}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
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
  defaultState: true
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
      benefit.Date = (b.Received || {}).date ? `${b.Received.month}/${b.Received.year}` : ''
      break
    case 'Future':
      b = (item.FutureBenefit || {})
      benefit.Country = (b.Country || {}).value
      benefit.Date = (b.Begin || {}).date ? `${b.Begin.month}/${b.Begin.year}` : ''
      break
    case 'Continuing':
      b = (item.ContinuingBenefit || {})
      benefit.Country = (b.Country || {}).value
      benefit.Date = (b.Began || {}).date ? `${b.Began.month}/${b.Began.year}` : ''
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
        <strong>{ summary || i18n.t('foreign.activities.benefit.collection.summary')}</strong>
      </span>
      <span className="date"><strong>{benefit.Date}</strong></span>
    </span>
  )
}
