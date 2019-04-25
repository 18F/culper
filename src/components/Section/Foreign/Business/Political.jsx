import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { PoliticalValidator } from 'validators'
import { Summary, DateSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_BUSINESS_POLITICAL } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectForeignSection from '../ForeignConnector'
import PoliticalItem from './PoliticalItem'

const sectionConfig = {
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_BUSINESS_POLITICAL.name,
  storeKey: FOREIGN_BUSINESS_POLITICAL.storeKey,
}

export class Political extends Subsection {
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
      HasForeignPolitical: this.props.HasForeignPolitical,
      ...queue,
    })
  }

  updateHasForeignPolitical = (values) => {
    this.update({
      HasForeignPolitical: values,
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
    const dates = DateSummary(obj.Dates)
    const pos = (obj.Position || {}).value || ''
    const country = (obj.Country || {}).value || ''
    const text = country.length ? `${pos} (${country})` : pos

    return Summary({
      type: i18n.t('foreign.business.political.collection.summary.item'),
      index,
      left: text,
      right: dates,
      placeholder: i18n.t('foreign.business.political.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content foreign-business-political"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_BUSINESS_POLITICAL.key}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.business.political')}</h1>
        <Branch
          name="has_foreign_political"
          label={i18n.t('foreign.business.political.heading.title')}
          labelSize="h4"
          {...this.props.HasForeignPolitical}
          warning
          onUpdate={this.updateHasForeignPolitical}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasForeignPolitical.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={PoliticalValidator}
            summary={this.summary}
            description={i18n.t('foreign.business.political.collection.summary.title')}
            appendTitle={i18n.t('foreign.business.political.collection.appendTitle')}
            appendLabel={i18n.t('foreign.business.political.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <PoliticalItem
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

Political.defaultProps = {
  name: 'Political',
  HasForeignPolitical: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'business/political',
  dispatch: () => {},
  validator: data => validate(schema('foreign.business.political', data)),
  defaultState: true,
  scrollToBottom: '',
}

export default connectForeignSection(Political, sectionConfig)
