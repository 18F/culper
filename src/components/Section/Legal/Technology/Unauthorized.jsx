import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { UnauthorizedValidator } from 'validators'
import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import {
  LEGAL,
  LEGAL_TECHNOLOGY_UNAUTHORIZED,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectLegalSection from '../LegalConnector'
import UnauthorizedItem from './UnauthorizedItem'

const sectionConfig = {
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_TECHNOLOGY_UNAUTHORIZED.name,
  storeKey: LEGAL_TECHNOLOGY_UNAUTHORIZED.storeKey,
}

export class Unauthorized extends Subsection {
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
      HasUnauthorized: this.props.HasUnauthorized,
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
      HasUnauthorized: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Date)
    const incident = (o.Incident || {}).value ? o.Incident.value : ''

    return Summary({
      type: i18n.t('legal.technology.unauthorized.collection.item'),
      index,
      left: incident,
      right: dates,
      placeholder: i18n.t('legal.technology.unauthorized.collection.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content legal-technology-unauthorized"
        data-section={LEGAL.key}
        data-subsection={LEGAL_TECHNOLOGY_UNAUTHORIZED.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.technology.unauthorized')}</h1>
        {i18n.m('legal.technology.unauthorized.para.intro')}
        <Branch
          name="has_unauthorized"
          label={i18n.t('legal.technology.unauthorized.heading.title')}
          labelSize="h4"
          className="legal-technology-unauthorized-has-unauthorized"
          {...this.props.HasUnauthorized}
          warning
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasUnauthorized.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={UnauthorizedValidator}
            description={i18n.t('legal.technology.unauthorized.collection.description')}
            appendTitle={i18n.t('legal.technology.unauthorized.collection.appendTitle')}
            appendLabel={i18n.t('legal.technology.unauthorized.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <UnauthorizedItem
              name="Item"
              bind
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
              addressBooks={this.props.addressBooks}
              dispatch={this.props.dispatch}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Unauthorized.defaultProps = {
  name: 'unauthorized',
  HasUnauthorized: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'technology/unauthorized',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('legal.technology.unauthorized', data)),
  scrollToBottom: '',
}

export default connectLegalSection(Unauthorized, sectionConfig)
