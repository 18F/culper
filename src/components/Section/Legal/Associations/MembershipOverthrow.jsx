import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { OverthrowValidator } from 'validators'
import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import {
  LEGAL,
  LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectLegalSection from '../LegalConnector'
import MembershipOverthrowItem from './MembershipOverthrowItem'

const sectionConfig = {
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW.name,
  storeKey: LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW.storeKey,
}

export class MembershipOverthrow extends Subsection {
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
      HasOverthrow: this.props.HasOverthrow,
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
      HasOverthrow: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Organization || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.overthrow.collection.item'),
      index,
      left: details,
      right: dates,
      placeholder: i18n.t('legal.associations.overthrow.collection.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content legal-associations-overthrow"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.associations.overthrow')}</h1>
        <Branch
          name="has_overthrow"
          label={i18n.t('legal.associations.overthrow.heading.title')}
          labelSize="h4"
          className="legal-associations-overthrow-has-overthrow"
          {...this.props.HasOverthrow}
          warning
          onError={this.handleError}
          validator={OverthrowValidator}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasOverthrow.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            validator={OverthrowValidator}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            description={i18n.t('legal.associations.overthrow.collection.description')}
            appendTitle={i18n.t('legal.associations.overthrow.collection.appendTitle')}
            appendLabel={i18n.t('legal.associations.overthrow.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <MembershipOverthrowItem
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

MembershipOverthrow.defaultProps = {
  name: 'overthrow',
  HasOverthrow: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'associations/membership-overthrow',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('legal.associations.membership-overthrow', data)),
  scrollToBottom: '',
}

export default connectLegalSection(MembershipOverthrow, sectionConfig)
