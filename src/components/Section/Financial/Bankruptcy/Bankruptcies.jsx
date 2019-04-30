import React from 'react'

import { i18n } from 'config'
import schema from 'schema'
import validate, { BankruptcyItemValidator } from 'validators'

import { Branch, Show, Accordion } from 'components/Form'
import { Summary, AddressSummary, DateSummary } from 'components/Summary'
import Subsection from 'components/Section/shared/Subsection'

import {
  FINANCIAL,
  FINANCIAL_BANKRUPTCY,
} from 'config/formSections/financial'

import connectFinancialSection from '../FinancialConnector'
import Bankruptcy from './Bankruptcy'

const sectionConfig = {
  section: FINANCIAL.name,
  store: FINANCIAL.store,
  subsection: FINANCIAL_BANKRUPTCY.name,
  storeKey: FINANCIAL_BANKRUPTCY.storeKey,
}

export class Bankruptcies extends Subsection {
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
      HasBankruptcy: this.props.HasBankruptcy,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateHasBankruptcy = (values) => {
    this.update({
      HasBankruptcy: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} },
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary = (item, index) => {
    const b = item.Item || {}
    const from = DateSummary(b.DateFiled)
    const address = AddressSummary(b.CourtAddress)

    return Summary({
      type: i18n.t('financial.bankruptcy.collection.summary.item'),
      index,
      left: address,
      right: from,
      placeholder: i18n.t('financial.bankruptcy.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content bankruptcies"
        data-section={FINANCIAL.key}
        data-subsection={FINANCIAL_BANKRUPTCY.key}
      >
        <h1 className="section-header">{i18n.t('financial.destination.bankruptcy')}</h1>
        <Branch
          name="has_bankruptcydebt"
          label={i18n.t('financial.bankruptcy.title')}
          labelSize="h4"
          className="bankruptcy-branch"
          {...this.props.HasBankruptcy}
          help="financial.bankruptcy.help"
          warning
          onUpdate={this.updateHasBankruptcy}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onError={this.handleError}
        />
        <Show when={(this.props.HasBankruptcy || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            required={this.props.required}
            validator={BankruptcyItemValidator}
            scrollIntoView={this.props.scrollIntoView}
            summary={this.summary}
            description={i18n.t(
              'financial.bankruptcy.collection.summary.title'
            )}
            appendTitle={i18n.t(
              'financial.bankruptcy.collection.summary.appendTitle'
            )}
            appendLabel={i18n.t('financial.bankruptcy.collection.append')}
          >
            <Bankruptcy
              name="Item"
              dispatch={this.props.dispatch}
              addressBooks={this.props.addressBooks}
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

Bankruptcies.defaultProps = {
  List: Accordion.defaultList,
  HasBankruptcy: {},
  addressBooks: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => validate(schema('financial.bankruptcy', data)),
  defaultState: true,
  scrollToBottom: '.bottom-btns',
}

export default connectFinancialSection(Bankruptcies, sectionConfig)
