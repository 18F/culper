import React from 'react'

import * as formTypes from 'constants/formTypes'

import i18n from 'util/i18n'

import schema from 'schema'
import validate, { TerroristValidator } from 'validators'

import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'

import {
  LEGAL,
  LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION,
} from 'config/formSections/legal'

import Subsection from 'components/Section/shared/Subsection'
import connectLegalSection from '../LegalConnector'
import TerroristOrganizationItem from './TerroristOrganizationItem'

const sectionConfig = {
  key: LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION.key,
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION.name,
  storeKey: LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION.storeKey,
}

export class TerroristOrganization extends Subsection {
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
      HasTerrorist: this.props.HasTerrorist,
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
      HasTerrorist: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Organization || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.terrorist.collection.item'),
      index,
      left: details,
      right: dates,
      placeholder: i18n.t('legal.associations.terrorist.collection.unknown'),
    })
  }

  render() {
    const { formType } = this.props

    const introCopy = formType === formTypes.SF86
      ? i18n.m('legal.associations.terrorist.para.intro')
      : i18n.m('legal.associations.terrorist.para.introWithoutSecurity')

    return (
      <div
        className="section-content legal-associations-terrorist"
        data-section={LEGAL.key}
        data-subsection={LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.associations.terroristOrganization')}</h1>
        {introCopy}
        <Branch
          name="has_terrorist"
          label={i18n.t('legal.associations.terrorist.heading.title')}
          labelSize="h4"
          className="legal-associations-terrorist-has-terrorist"
          {...this.props.HasTerrorist}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasTerrorist.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={TerroristValidator}
            description={i18n.t('legal.associations.terrorist.collection.description')}
            appendTitle={i18n.t('legal.associations.terrorist.collection.appendTitle')}
            appendLabel={i18n.t('legal.associations.terrorist.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <TerroristOrganizationItem
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

TerroristOrganization.defaultProps = {
  name: 'terrorist-organization',
  HasTerrorist: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'associations/terrorist-organization',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('legal.associations.terrorist-organization', data)),
  scrollToBottom: '',
}

export default connectLegalSection(TerroristOrganization, sectionConfig)
