import React from 'react'

import i18n from 'util/i18n'
import * as formConfig from 'config/forms'
import { getNumberOfYearsString } from 'helpers/text'
import { Branch, Show, Accordion } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import Subsection from 'components/Section/shared/Subsection'

import { FINANCIAL, FINANCIAL_GAMBLING } from 'config/formSections/financial'

import GamblingItem from './GamblingItem'

const sectionConfig = {
  key: FINANCIAL_GAMBLING.key,
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
    const { formType, errors } = this.props
    const formTypeConfig = formType && formConfig[formType]
    const years = formTypeConfig && formTypeConfig.FINANCIAL_RECORD_GAMBLING_YEARS
    let branchLabelCopy
    if (years === 'EVER') {
      branchLabelCopy = i18n.t('financial.gambling.title')
    } else {
      const numberOfYearsString = getNumberOfYearsString(years)
      branchLabelCopy = i18n.t('financial.gambling.titleWithNum', { numberOfYearsString })
    }

    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content gambling"
        data-section={FINANCIAL.key}
        data-subsection={FINANCIAL_GAMBLING.key}
      >
        <h1 className="section-header">{i18n.t('financial.destination.gambling')}</h1>
        <Branch
          name="has_gamblingdebt"
          label={branchLabelCopy}
          labelSize="h4"
          className="has-gambling-debt"
          {...this.props.HasGamblingDebt}
          warning={true}
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
            errors={accordionErrors}
            scrollIntoView={this.props.scrollIntoView}
            appendLabel={i18n.t('financial.gambling.collection.append')}
            appendTitle={i18n.t('financial.gambling.collection.appendTitle')}
          >
            <GamblingItem
              name="Item"
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              bind={true}
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
  defaultState: true,
  scrollToBottom: '.bottom-btns',
  errors: [],
}

export default connectSubsection(Gambling, sectionConfig)
