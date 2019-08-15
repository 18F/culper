import React from 'react'

import { i18n } from 'config'
import schema from 'schema'
import validate, { CreditItemValidator } from 'validators'

import { Branch, Show, Accordion } from 'components/Form'
import { Summary } from 'components/Summary'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import Subsection from 'components/Section/shared/Subsection'

import { FINANCIAL, FINANCIAL_CREDIT } from 'config/formSections/financial'

import CreditItem from './CreditItem'

const sectionConfig = {
  key: FINANCIAL_CREDIT.key,
  section: FINANCIAL.name,
  store: FINANCIAL.store,
  subsection: FINANCIAL_CREDIT.name,
  storeKey: FINANCIAL_CREDIT.storeKey,
}

export class Credit extends Subsection {
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
      HasCreditCounseling: this.props.HasCreditCounseling,
      List: this.props.List,
      ...queue,
    })
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch = (values) => {
    this.update({
      HasCreditCounseling: values,
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
    const name = (obj.Name || {}).value || ''

    return Summary({
      type: i18n.t('financial.credit.collection.summary.item'),
      index,
      left: name,
      right: null,
      placeholder: i18n.t('financial.credit.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content credit-counseling"
        data-section={FINANCIAL.key}
        data-subsection={FINANCIAL_CREDIT.key}
      >
        <h1 className="section-header">{i18n.t('financial.destination.credit')}</h1>
        <Branch
          name="has_credit"
          label={i18n.t('financial.credit.title')}
          labelSize="h4"
          className="credit-branch"
          {...this.props.HasCreditCounseling}
          warning={true}
          onUpdate={this.updateBranch}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onError={this.handleError}
        />
        <Show when={(this.props.HasCreditCounseling || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t('financial.credit.collection.summary.title')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
            validator={CreditItemValidator}
            appendTitle={i18n.t('financial.credit.collection.appendTitle')}
            appendLabel={i18n.t('financial.credit.collection.append')}
          >
            <CreditItem
              name="Item"
              bind={true}
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Credit.defaultProps = {
  HasCreditCounseling: {},
  List: {},
  addressBooks: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => validate(schema('financial.credit', data)),
  defaultState: true,
  scrollToBottom: '.bottom-btns',
}

export default connectSubsection(Credit, sectionConfig)
