import React from 'react'
import { i18n } from '@config'

import schema from '@schema'

import validate, {
  FederalServiceValidator,
  FederalServiceItemValidator
} from '@validators'

import Subsection from '@components/Section/shared/Subsection'
import connectHistorySection from '../HistoryConnector'

import { Branch, Show, Accordion } from '@components/Form'
import { Summary, DateSummary } from '@components/Summary'

import FederalItem from './FederalItem'

import { HISTORY, HISTORY_FEDERAL } from '@config/formSections/history'

const sectionConfig = {
  section: HISTORY.name,
  store: HISTORY.store,
  subsection: HISTORY_FEDERAL.name,
  storeKey: HISTORY_FEDERAL.storeKey,
}

export class Federal extends Subsection {
  constructor(props) {
    super(props)

    const { section, subsection, store, storeKey } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate('Federal', {
      HasFederalService: this.props.HasFederalService,
      List: this.props.List,
      ...queue
    })
  }

  updateBranch(values) {
    this.update({
      HasFederalService: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  updateList(values) {
    this.update({
      List: values
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary(item, index) {
    item = (item && item.Item) || {}
    const agency = item && item.Name && item.Name.value ? item.Name.value : ''
    const dates = DateSummary(item.Dates)

    return Summary({
      type: i18n.t('history.federal.collection.summary.item'),
      index: index,
      left: agency,
      right: dates,
      placeholder: i18n.t('history.federal.collection.summary.unknown')
    })
  }

  render() {
    return (
      <div
        className="section-content federal"
        {...super.dataAttributes()}>
        <Branch
          name="has_federalservice"
          label={i18n.t('history.federal.heading.branch')}
          labelSize="h4"
          help="history.federal.help.branch"
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
            scrollIntoView={this.props.scrollIntoView}>
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
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'history',
  subsection: 'federal',
  addressBooks: {},
  dispatch: () => {},
  validator: data => {
    return validate(schema('history.federal', data))
  },
  defaultState: true
}

export default connectHistorySection(Federal, sectionConfig)
