import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { EngagedValidator } from 'validators'
import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import {
  LEGAL,
  LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectLegalSection from '../LegalConnector'
import EngagedInTerrorismItem from './EngagedInTerrorismItem'

const sectionConfig = {
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM.name,
  storeKey: LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM.storeKey,
}

export class EngagedInTerrorism extends Subsection {
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
      HasEngaged: this.props.HasEngaged,
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
      HasEngaged: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Reasons || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.engaged.collection.item'),
      index,
      left: details,
      right: dates,
      placeholder: i18n.t('legal.associations.engaged.collection.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content legal-associations-engaged"
        data-section={LEGAL.key}
        data-subsection={LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.associations.engagedTerrorism')}</h1>
        <Branch
          name="has_engaged"
          label={i18n.t('legal.associations.engaged.heading.title')}
          labelSize="h4"
          className="legal-associations-engaged-has-engaged"
          {...this.props.HasEngaged}
          warning
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasEngaged.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={EngagedValidator}
            description={i18n.t('legal.associations.engaged.collection.description')}
            appendTitle={i18n.t('legal.associations.engaged.collection.appendTitle')}
            appendLabel={i18n.t('legal.associations.engaged.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <EngagedInTerrorismItem
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

EngagedInTerrorism.defaultProps = {
  name: 'engaged',
  HasEngaged: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'associations/engaged-in-terrorism',
  dispatch: () => {},
  validator: data => validate(schema('legal.associations.engaged-in-terrorism', data)),
  scrollToBottom: '',
}

export default connectLegalSection(EngagedInTerrorism, sectionConfig)
