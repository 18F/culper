import React from 'react'

import i18n from 'util/i18n'
import schema from 'schema'
import validate, { DelinquentItemValidator } from 'validators'

import { Branch, Show, Accordion } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import Subsection from 'components/Section/shared/Subsection'

import { FINANCIAL, FINANCIAL_DELINQUENT } from 'config/formSections/financial'
import * as formConfig from 'config/forms'

import { getYearsString } from 'helpers/text'

import connectFinancialSection from '../FinancialConnector'

import DelinquentItem from './DelinquentItem'

const sectionConfig = {
  section: FINANCIAL.name,
  store: FINANCIAL.store,
  subsection: FINANCIAL_DELINQUENT.name,
  storeKey: FINANCIAL_DELINQUENT.storeKey,
}

export class Delinquent extends Subsection {
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
      HasDelinquent: this.props.HasDelinquent,
      List: this.props.List,
      ...queue,
    })
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch = (values) => {
    this.update({
      HasDelinquent: values,
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
    const date = obj.Date || {}
    const from = DateSummary({ date })
    const name = (obj.Name || {}).value || ''
    const amount = (obj.Amount || {}).value || ''
    const text = `${name}${amount ? `, $${amount}` : ''}`.trim()

    return Summary({
      type: i18n.t('financial.delinquent.collection.summary.item'),
      index,
      left: text,
      right: from,
      placeholder: i18n.t('financial.delinquent.collection.summary.unknown'),
    })
  }

  render() {
    const {
      formType, allowFinancialDelinquentNonFederal, requireFinancialDelinquentName,
    } = this.props
    const formTypeConfig = formType && formConfig[formType]
    const years = formTypeConfig && formTypeConfig.FINANCIAL_RECORD_DELINQUENT_YEARS
    const yearsString = getYearsString(years)

    const descriptionMessage = allowFinancialDelinquentNonFederal
      ? (
        <div>
          <ul>
            <li>{i18n.m('financial.delinquent.para.alimony', { years, yearsString })}</li>
            <li>{i18n.m('financial.delinquent.para.judgement', { years, yearsString })}</li>
            <li>{i18n.m('financial.delinquent.para.lien', { years, yearsString })}</li>
            <li>{i18n.m('financial.delinquent.para.federal')}</li>
          </ul>
        </div>
      ) : (
        <div>
          {i18n.m('financial.delinquent.para.federal')}
        </div>
      )

    return (
      <div
        className="section-content delinquent"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('financial.destination.delinquent')}</h1>
        <Branch
          name="has_delinquent"
          label={i18n.t('financial.delinquent.title')}
          labelSize="h4"
          className="delinquent-branch eapp-field-wrap"
          {...this.props.HasDelinquent}
          warning
          onUpdate={this.updateBranch}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onError={this.handleError}
        >
          {i18n.m('financial.delinquent.para.details')}
          {descriptionMessage}
        </Branch>
        <Show when={(this.props.HasDelinquent || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t(
              'financial.delinquent.collection.summary.title'
            )}
            appendTitle={i18n.t('financial.delinquent.collection.appendTitle')}
            appendMessage={descriptionMessage}
            validator={DelinquentItemValidator}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
            appendLabel={i18n.t('financial.delinquent.collection.append')}
          >
            <DelinquentItem
              name="Item"
              bind
              dispatch={this.props.dispatch}
              addressBooks={this.props.addressBooks}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              allowFinancialDelinquentNonFederal={allowFinancialDelinquentNonFederal}
              requireFinancialDelinquentName={requireFinancialDelinquentName}
              years={years}
              yearsString={yearsString}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Delinquent.defaultProps = {
  HasDelinquent: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => validate(schema('financial.delinquent', data)),
  defaultState: true,
  scrollToBottom: '.bottom-btns',
}

export default connectFinancialSection(Delinquent, sectionConfig)
