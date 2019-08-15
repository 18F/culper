import React from 'react'
import { i18n } from 'config'
import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import {
  LEGAL,
  LEGAL_INVESTIGATIONS_HISTORY,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import HistoryItem from './HistoryItem'

const sectionConfig = {
  key: LEGAL_INVESTIGATIONS_HISTORY.key,
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_INVESTIGATIONS_HISTORY.name,
  storeKey: LEGAL_INVESTIGATIONS_HISTORY.storeKey,
}

export class History extends Subsection {
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
      HasHistory: this.props.HasHistory,
      ...queue,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateBranch = (values) => {
    this.update({
      HasHistory: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Granted)
    const agency = (o.Agency || {}).Agency || ''

    return Summary({
      type: i18n.t('legal.investigations.history.collection.item'),
      index,
      left: agency,
      right: dates,
      placeholder: i18n.t('legal.investigations.history.collection.unknown'),
    })
  }

  render() {
    const { requireLegalInvestigationClearanceGranted, errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content investigations-history"
        data-section={LEGAL.key}
        data-subsection={LEGAL_INVESTIGATIONS_HISTORY.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.investigations.history')}</h1>
        <Branch
          name="has_history"
          label={i18n.t('legal.investigations.history.heading.title')}
          labelSize="h4"
          className="legal-investigations-history-has-history"
          {...this.props.HasHistory}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasHistory.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            description={i18n.t('legal.investigations.history.collection.description')}
            appendTitle={i18n.t('legal.investigations.history.collection.appendTitle')}
            appendLabel={i18n.t('legal.investigations.history.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <HistoryItem
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              requireLegalInvestigationClearanceGranted={requireLegalInvestigationClearanceGranted}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

History.defaultProps = {
  name: 'history',
  HasHistory: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'investigations/history',
  dispatch: () => {},
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(History, sectionConfig)
