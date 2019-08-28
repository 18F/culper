import React from 'react'

import i18n from 'util/i18n'

import { HISTORY, HISTORY_FEDERAL } from 'config/formSections/history'
import * as formConfig from 'config/forms'

import schema from 'schema'

import validate, { FederalServiceItemValidator } from 'validators'

import connectSubsection from 'components/Section/shared/SubsectionConnector'
import Subsection from 'components/Section/shared/Subsection'
import { Branch, Show, Accordion } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'

import FederalItem from './FederalItem'

const sectionConfig = {
  key: HISTORY_FEDERAL.key,
  section: HISTORY.name,
  store: HISTORY.store,
  subsection: HISTORY_FEDERAL.name,
  storeKey: HISTORY_FEDERAL.storeKey,
}

export class Federal extends Subsection {
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
    this.props.onUpdate('Federal', {
      HasFederalService: this.props.HasFederalService,
      List: this.props.List,
      ...queue,
    })
  }

  updateBranch = (values) => {
    this.update({
      HasFederalService: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary = (item, index) => {
    const summaryItem = (item && item.Item) || {}
    const agency = summaryItem && summaryItem.Name && summaryItem.Name.value ? summaryItem.Name.value : ''
    const dates = DateSummary(summaryItem.Dates)

    return Summary({
      type: i18n.t('history.federal.collection.summary.item'),
      index,
      left: agency,
      right: dates,
      placeholder: i18n.t('history.federal.collection.summary.unknown'),
    })
  }

  render() {
    const { formType } = this.props

    const years = formType
      && formConfig[formType]
      && formConfig[formType].HISTORY_FEDERAL_YEARS

    return (
      <div
        className="section-content federal"
        data-section={HISTORY.key}
        data-subsection={HISTORY_FEDERAL.key}
      >
        <Branch
          name="has_federalservice"
          label={i18n.t('history.federal.heading.branch')}
          labelSize="h4"
          help="history.federal.help.branch"
          helpTitle={i18n.t('history.federal.help.branch.title', { years })}
          {...this.props.HasFederalService}
          warning={true}
          onUpdate={this.updateBranch}
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />
        <Show when={this.props.HasFederalService.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            onUpdate={this.updateList}
            onError={this.handleError}
            summary={this.summary}
            description={i18n.t('history.federal.collection.summary.title')}
            appendTitle={i18n.t('history.federal.collection.appendTitle')}
            appendLabel={i18n.t('history.federal.collection.append')}
            required={this.props.required}
            validator={FederalServiceItemValidator}
            scrollIntoView={this.props.scrollIntoView}
          >
            <FederalItem
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              onError={this.props.onError}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Federal.defaultProps = {
  HasFederalService: {},
  List: Accordion.defaultList,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'history',
  subsection: 'federal',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('history.federal', data)),
  defaultState: true,
}

export default connectSubsection(Federal, sectionConfig)
