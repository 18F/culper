import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { ForeignBenefitValidator } from 'validators'
import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import { FOREIGN, FOREIGN_ACTIVITIES_BENEFITS } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectForeignSection from '../../ForeignConnector'
import Benefit from './Benefit'

const sectionConfig = {
  key: FOREIGN_ACTIVITIES_BENEFITS.key,
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_ACTIVITIES_BENEFITS.name,
  storeKey: FOREIGN_ACTIVITIES_BENEFITS.storeKey,
}
export class BenefitActivity extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      List: this.props.List,
      HasBenefits: this.props.HasBenefits,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateHasBenefits = (values) => {
    this.update({
      HasBenefits: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const benefit = {}
    const who = ((o.InterestTypes || {}).values || []).join(', ')

    let b = null
    if (o.BenefitFrequency) {
      switch (o.BenefitFrequency.value) {
        case 'OneTime':
          b = o.OneTimeBenefit || {}
          benefit.Country = (b.Country || {}).value
          benefit.Date = DateSummary(b.Received)
          break
        case 'Future':
          b = o.FutureBenefit || {}
          benefit.Country = (b.Country || {}).value
          benefit.Date = DateSummary(b.Began)
          break
        case 'Continuing':
          b = o.ContinuingBenefit || {}
          benefit.Country = (b.Country || {}).value
          benefit.Date = DateSummary(b.Began)
          break
        case 'Other':
          break
        default:
          console.warn(' There is no such benefit type')
          break
      }
    }

    const summary = [who, benefit.Country].reduce((prev, next) => {
      if (prev && next) {
        return `${prev} - ${next}`
      }
      return prev
    })

    return Summary({
      type: i18n.t('foreign.activities.benefit.collection.itemType'),
      index,
      left: summary,
      right: benefit.Date,
      placeholder: i18n.t('foreign.activities.benefit.collection.summary'),
    })
  }

  render() {
    return (
      <div
        className="section-content benefit-activity"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_ACTIVITIES_BENEFITS.key}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.activities.benefits')}</h1>
        <Branch
          name="has_benefit"
          className="has-benefits"
          label={i18n.t('foreign.activities.benefit.heading.title')}
          labelSize="h4"
          {...this.props.HasBenefits}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateHasBenefits}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasBenefits.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
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
            scrollIntoView={this.props.scrollIntoView}
          >
            <Benefit
              name="Item"
              bind={true}
              required={this.props.required}
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
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'activities/benefits',
  dispatch: () => {},
  validator: data => validate(schema('foreign.activities.benefits', data)),
  scrollToBottom: '',
}

export default connectForeignSection(BenefitActivity, sectionConfig)
