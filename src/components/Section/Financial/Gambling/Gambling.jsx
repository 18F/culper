import React from 'react'

import { i18n } from 'config'
import schema from 'schema'
import validate, { GamblingItemValidator } from 'validators'

import { Branch, Show, Accordion } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import Subsection from 'components/Section/shared/Subsection'

import { FINANCIAL, FINANCIAL_GAMBLING } from 'config/formSections/financial'
import connectFinancialSection from '../FinancialConnector'

import GamblingItem from './GamblingItem'

const sectionConfig = {
  section: FINANCIAL.name,
  store: FINANCIAL.store,
  subsection: FINANCIAL_GAMBLING.name,
  storeKey: FINANCIAL_GAMBLING.storeKey,
}

export class Gambling extends Subsection {
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
      HasGamblingDebt: this.props.HasGamblingDebt,
      List: this.props.List,
      ...queue,
    })
  }

  /**
   * Updates triggered by the branching component.
   */
  onUpdate = (values) => {
    this.update({
      HasGamblingDebt: values,
      List: values.value === 'Yes' ? this.props.List : {},
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  myDispatch = (values) => {
    this.update({
      List: values,
    })
  }

  /**
   * Takes a value such as "1000" and converts it to "1,000".
   */
  fancyNumber = (value) => {
    const n = new window.Number(value)
    return n.toLocaleString()
  }

  /**
   * Assists in rendering the summary section.
   */
  summary = (row, index) => {
    const item = row.Item || {}
    const dates = DateSummary(item.Dates)
    const losses = item.Losses && item.Losses.value
      ? `$${this.fancyNumber(item.Losses.value)}`
      : ''

    return Summary({
      type: i18n.t('financial.gambling.collection.summary.debt'),
      index,
      left: losses,
      right: dates,
      placeholder: i18n.t('financial.gambling.collection.summary.unknownlosses'),
    })
  }

  render() {
    return (
      <div
        className="section-content gambling"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('financial.destination.gambling')}</h1>
        <Branch
          name="has_gamblingdebt"
          label={i18n.t('financial.gambling.title')}
          labelSize="h4"
          className="has-gambling-debt"
          {...this.props.HasGamblingDebt}
          warning
          onUpdate={this.onUpdate}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onError={this.handleError}
        />
        <Show when={(this.props.HasGamblingDebt || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.myDispatch}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t('financial.gambling.collection.summary.title')}
            required={this.props.required}
            validator={GamblingItemValidator}
            scrollIntoView={this.props.scrollIntoView}
            appendLabel={i18n.t('financial.gambling.collection.append')}
            appendTitle={i18n.t('financial.gambling.collection.appendTitle')}
          >
            <GamblingItem
              name="Item"
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              bind
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Gambling.defaultProps = {
  List: {},
  HasGamblingDebt: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => validate(schema('financial.gambling', data)),
  defaultState: true,
  scrollToBottom: '.bottom-btns',
}

export default connectFinancialSection(Gambling, sectionConfig)
