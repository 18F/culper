import React from 'react'

import { i18n } from 'config'
import schema from 'schema'
import validate, { NonpaymentItemValidator } from 'validators'

import { Summary, DateSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import Subsection from 'components/Section/shared/Subsection'

import { FINANCIAL, FINANCIAL_NONPAYMENT } from 'config/formSections/financial'

import NonpaymentItem from './NonpaymentItem'

const sectionConfig = {
  key: FINANCIAL_NONPAYMENT.key,
  section: FINANCIAL.name,
  store: FINANCIAL.store,
  subsection: FINANCIAL_NONPAYMENT.name,
  storeKey: FINANCIAL_NONPAYMENT.storeKey,
}

export class Nonpayment extends Subsection {
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
      HasNonpayment: this.props.HasNonpayment,
      List: this.props.List,
      ...queue,
    })
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch = (values) => {
    this.update({
      HasNonpayment: values,
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
  summary = (row, index) => {
    const obj = row.Item || {}
    const date = DateSummary(obj.Date)
    const name = (obj.Name || {}).value || ''
    const amount = (obj.Amount || {}).value
    const text = `${name}${amount ? `, $${amount}` : ''}`.trim()

    return Summary({
      type: i18n.t('financial.nonpayment.collection.summary.item'),
      index,
      left: text,
      right: date,
      placeholder: i18n.t('financial.nonpayment.collection.summary.unknown'),
    })
  }

  message = () => (
    <div>
      <ul>
        <li>{i18n.m('financial.nonpayment.para.repo')}</li>
        <li>{i18n.m('financial.nonpayment.para.defaulted')}</li>
        <li>{i18n.m('financial.nonpayment.para.collections')}</li>
        <li>{i18n.m('financial.nonpayment.para.cancelled')}</li>
        <li>{i18n.m('financial.nonpayment.para.evicted')}</li>
        <li>{i18n.m('financial.nonpayment.para.garnished')}</li>
        <li>{i18n.m('financial.nonpayment.para.delinquent')}</li>
        <li>{i18n.m('financial.nonpayment.para.any')}</li>
      </ul>
    </div>
  )

  render() {
    return (
      <div
        className="section-content nonpayment"
        data-section={FINANCIAL.key}
        data-subsection={FINANCIAL_NONPAYMENT.key}
      >
        <h1 className="section-header">{i18n.t('financial.destination.nonpayment')}</h1>
        <Branch
          name="has_nonpayment"
          label={i18n.t('financial.nonpayment.title')}
          labelSize="h4"
          className="nonpayment-branch"
          {...this.props.HasNonpayment}
          warning={true}
          onUpdate={this.updateBranch}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onError={this.handleError}
        >
          <ul>
            <li>{i18n.m('financial.nonpayment.para.repo')}</li>
            <li>{i18n.m('financial.nonpayment.para.defaulted')}</li>
            <li>{i18n.m('financial.nonpayment.para.collections')}</li>
            <li>{i18n.m('financial.nonpayment.para.cancelled')}</li>
            <li>{i18n.m('financial.nonpayment.para.evicted')}</li>
            <li>{i18n.m('financial.nonpayment.para.garnished')}</li>
            <li>{i18n.m('financial.nonpayment.para.delinquent')}</li>
            <li>{i18n.m('financial.nonpayment.para.any')}</li>
          </ul>
        </Branch>
        <Show when={(this.props.HasNonpayment || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t(
              'financial.nonpayment.collection.summary.title'
            )}
            appendTitle={i18n.t('financial.nonpayment.collection.appendTitle')}
            required={this.props.required}
            validator={NonpaymentItemValidator}
            scrollIntoView={this.props.scrollIntoView}
            appendMessage={this.message()}
            appendLabel={i18n.t('financial.nonpayment.collection.append')}
          >
            <NonpaymentItem
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

Nonpayment.defaultProps = {
  HasNonpayment: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => validate(schema('financial.nonpayment', data)),
  scrollToBottom: '.bottom-btns',
}

export default connectSubsection(Nonpayment, sectionConfig)
