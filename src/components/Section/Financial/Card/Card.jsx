import React from 'react'

import { i18n } from 'config'
import schema from 'schema'
import validate, { CardAbuseItemValidator } from 'validators'

import { Branch, Show, Accordion } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import Subsection from 'components/Section/shared/Subsection'

import { FINANCIAL, FINANCIAL_CARD } from 'config/formSections/financial'
import connectFinancialSection from '../FinancialConnector'

import CardItem from './CardItem'

const sectionConfig = {
  section: FINANCIAL.name,
  store: FINANCIAL.store,
  subsection: FINANCIAL_CARD.name,
  storeKey: FINANCIAL_CARD.storeKey,
}

export class Card extends Subsection {
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
      HasCardAbuse: this.props.HasCardAbuse,
      List: this.props.List,
      ...queue,
    })
  }

  /**
   * Updates triggered by the branching component.
   */
  updateBranch = (values) => {
    this.update({
      HasCardAbuse: values,
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
    const from = DateSummary(date)
    const agency = (obj.Agency || {}).value || ''

    return Summary({
      type: i18n.t('financial.card.collection.summary.item'),
      index,
      left: agency,
      right: from,
      placeholder: i18n.t('financial.card.collection.summary.unknown'),
    })
  }

  render() {
    const { requireFinancialCardDisciplinaryDate } = this.props
    return (
      <div
        className="section-content card-abuse"
        data-section={FINANCIAL.key}
        data-subsection={FINANCIAL_CARD.key}
      >
        <h1 className="section-header">{i18n.t('financial.destination.card')}</h1>
        <Branch
          name="has_cardabuse"
          label={i18n.t('financial.card.title')}
          labelSize="h4"
          className="card-branch"
          {...this.props.HasCardAbuse}
          warning
          onUpdate={this.updateBranch}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
          onError={this.handleError}
        />
        <Show when={(this.props.HasCardAbuse || {}).value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t('financial.card.collection.summary.title')}
            required={this.props.required}
            validator={CardAbuseItemValidator}
            scrollIntoView={this.props.scrollIntoView}
            appendTitle={i18n.t('financial.card.collection.appendTitle')}
            appendLabel={i18n.t('financial.card.collection.append')}
          >
            <CardItem
              name="Item"
              bind
              dispatch={this.props.dispatch}
              addressBooks={this.props.addressBooks}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              requireFinancialCardDisciplinaryDate={requireFinancialCardDisciplinaryDate}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Card.defaultProps = {
  HasCardAbuse: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => validate(schema('financial.card', data)),
  defaultState: true,
  scrollToBottom: '.bottom-btns',
  requireFinancialCardDisciplinaryDate: true,
}

export default connectFinancialSection(Card, sectionConfig)
