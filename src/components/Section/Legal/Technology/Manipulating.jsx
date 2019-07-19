import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { ManipulatingValidator } from 'validators'
import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import {
  LEGAL,
  LEGAL_TECHNOLOGY_MANIPULATING,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectLegalSection from '../LegalConnector'
import ManipulatingItem from './ManipulatingItem'

const sectionConfig = {
  key: LEGAL_TECHNOLOGY_MANIPULATING.key,
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_TECHNOLOGY_MANIPULATING.name,
  storeKey: LEGAL_TECHNOLOGY_MANIPULATING.storeKey,
}

export class Manipulating extends Subsection {
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
      HasManipulating: this.props.HasManipulating,
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
      HasManipulating: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Date)
    const incident = (o.Incident || {}).value ? o.Incident.value : ''

    return Summary({
      type: i18n.t('legal.technology.manipulating.collection.item'),
      index,
      left: incident,
      right: dates,
      placeholder: i18n.t('legal.technology.manipulating.collection.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content legal-technology-manipulating"
        data-section={LEGAL.key}
        data-subsection={LEGAL_TECHNOLOGY_MANIPULATING.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.technology.manipulating')}</h1>
        <Branch
          name="has_manipulating"
          label={i18n.t('legal.technology.manipulating.heading.title')}
          labelSize="h4"
          className="legal-technology-manipulating-has-manipulating"
          {...this.props.HasManipulating}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasManipulating.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={ManipulatingValidator}
            description={i18n.t('legal.technology.manipulating.collection.description')}
            appendTitle={i18n.t('legal.technology.manipulating.collection.appendTitle')}
            appendLabel={i18n.t('legal.technology.manipulating.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <ManipulatingItem
              name="Item"
              bind={true}
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Manipulating.defaultProps = {
  name: 'manipulating',
  HasManipulating: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'technology/manipulating',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('legal.technology.manipulating', data)),
  scrollToBottom: '',
}

export default connectLegalSection(Manipulating, sectionConfig)
