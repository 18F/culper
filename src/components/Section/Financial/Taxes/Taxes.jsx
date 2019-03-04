import React from 'react'

import { i18n } from 'config'
import schema from 'schema'
import validate, { TaxValidator } from 'validators'

import { Branch, Show, Accordion } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import Subsection from 'components/Section/shared/Subsection'

import { FINANCIAL, FINANCIAL_TAXES } from 'config/formSections/financial'
import connectFinancialSection from '../FinancialConnector'

import TaxesItem from './TaxesItem'

const sectionConfig = {
  section: FINANCIAL.name,
  store: FINANCIAL.store,
  subsection: FINANCIAL_TAXES.name,
  storeKey: FINANCIAL_TAXES.storeKey,
}

export class Taxes extends Subsection {
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
      HasTaxes: this.props.HasTaxes,
      List: this.props.List,
      ...queue,
    })
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch = (values) => {
    this.update({
      HasTaxes: values,
      List: values.value === 'Yes' ? this.props.List : {},
    })
  }

  /**
   * Dispatch callback initiated from the collection to notify of any new
   * updates to the items.
   */
  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary = (item, index) => {
    const obj = item.Item || {}
    const date = obj.Year || {}
    const year = DateSummary(date)

    const agency = (obj.Agency || {}).value || ''

    return Summary({
      type: i18n.t('financial.taxes.collection.summary.item'),
      index,
      left: agency,
      right: year,
      placeholder: i18n.t('financial.taxes.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content taxes"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('financial.destination.taxes')}</h1>
        <Branch
          name="has_taxes"
          label={i18n.t('financial.taxes.title')}
          labelSize="h4"
          className="taxes-branch"
          {...this.props.HasTaxes}
          warning
          onUpdate={this.updateBranch}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onError={this.handleError}
        />
        <Show when={(this.props.HasTaxes || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            summary={this.summary}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
            validator={TaxValidator}
            description={i18n.t('financial.taxes.collection.summary.title')}
            appendTitle={i18n.t('financial.taxes.collection.appendTitle')}
            appendLabel={i18n.t('financial.taxes.collection.append')}
          >
            <TaxesItem
              name="Item"
              bind
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Taxes.defaultProps = {
  HasTaxes: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => validate(schema('financial.taxes', data)),
  defaultState: true,
  scrollToBottom: '.bottom-btns',
}

export default connectFinancialSection(Taxes, sectionConfig)
