import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { ConferencesValidator } from 'validators'
import { Summary, DateSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_BUSINESS_CONFERENCES } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectForeignSection from '../ForeignConnector'
import ConferencesItem from './ConferencesItem'

const sectionConfig = {
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_BUSINESS_CONFERENCES.name,
  storeKey: FOREIGN_BUSINESS_CONFERENCES.storeKey,
}

export class Conferences extends Subsection {
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
      HasForeignConferences: this.props.HasForeignConferences,
      ...queue,
    })
  }

  updateHasForeignConferences = (values) => {
    this.update({
      HasForeignConferences: values,
      List: values.value === 'Yes'
        ? this.props.List
        : { items: [], branch: {} },
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  summary = (item, index) => {
    const obj = (item && item.Item) || {}
    const date = DateSummary(item.Dates)
    const city = (obj.City || {}).value || ''

    return Summary({
      type: i18n.t('foreign.business.conferences.collection.summary.item'),
      index,
      left: city,
      right: date,
      placeholder: i18n.t('foreign.business.conferences.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content foreign-business-conferences"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.business.conferences')}</h1>
        <Branch
          name="has_foreign_conferences"
          label={i18n.t('foreign.business.conferences.heading.title')}
          labelSize="h4"
          adjustFor="p"
          {...this.props.HasForeignConferences}
          warning
          onUpdate={this.updateHasForeignConferences}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('foreign.business.conferences.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignConferences.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={ConferencesValidator}
            summary={this.summary}
            description={i18n.t('foreign.business.conferences.collection.summary.title')}
            appendTitle={i18n.t('foreign.business.conferences.collection.appendTitle')}
            appendMessage={i18n.m('foreign.business.conferences.collection.appendMessage')}
            appendLabel={i18n.t('foreign.business.conferences.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <ConferencesItem
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

Conferences.defaultProps = {
  name: 'Conferences',
  HasForeignConferences: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'business/conferences',
  dispatch: () => {},
  validator: data => validate(schema('foreign.business.conferences', data)),
  defaultState: true,
  scrollToBottom: '',
}

export default connectForeignSection(Conferences, sectionConfig)
