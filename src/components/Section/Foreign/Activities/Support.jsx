import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { SupportValidator } from 'validators'
import { Summary, NameSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_ACTIVITIES_SUPPORT } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectForeignSection from '../ForeignConnector'
import SupportItem from './SupportItem'

const sectionConfig = {
  key: FOREIGN_ACTIVITIES_SUPPORT.key,
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_ACTIVITIES_SUPPORT.name,
  storeKey: FOREIGN_ACTIVITIES_SUPPORT.storeKey,
}
export class Support extends Subsection {
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
      HasForeignSupport: this.props.HasForeignSupport,
      List: this.props.List,
      ...queue,
    })
  }

  updateHasForeignSupport = (values) => {
    this.update({
      HasForeignSupport: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const name = NameSummary(o.Name)
    return Summary({
      type: i18n.t('foreign.activities.support.collection.summary.item'),
      index,
      left: name,
      placeholder: i18n.t('foreign.activities.support.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content foreign-activities-support"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_ACTIVITIES_SUPPORT.key}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.activities.support')}</h1>
        <Branch
          name="has_foreign_support"
          label={i18n.t('foreign.activities.support.heading.title')}
          labelSize="h4"
          {...this.props.HasForeignSupport}
          warning={true}
          onUpdate={this.updateHasForeignSupport}
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasForeignSupport.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={SupportValidator}
            summary={this.summary}
            description={i18n.t('foreign.activities.support.collection.summary.title')}
            appendTitle={i18n.t('foreign.activities.support.collection.appendTitle')}
            appendLabel={i18n.t('foreign.activities.support.collection.append')}
            required={this.props.required}
            scrollToBottom={this.props.scrollToBottom}
            scrollIntoView={this.props.scrollIntoView}
          >
            <SupportItem
              name="Item"
              bind={true}
              dispatch={this.props.dispatch}
              addressBooks={this.props.addressBooks}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Support.defaultProps = {
  name: 'Support',
  HasForeignSupport: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'activities/support',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('foreign.activities.support', data)),
  defaultState: true,
}

export default connectForeignSection(Support, sectionConfig)
