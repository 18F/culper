import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { ViolenceValidator } from 'validators'
import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import {
  LEGAL,
  LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectLegalSection from '../LegalConnector'
import MembershipViolenceItem from './MembershipViolenceItem'

const sectionConfig = {
  section: LEGAL.name,
  store: LEGAL.store,
  subsection: LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE.name,
  storeKey: LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE.storeKey,
}

export class MembershipViolence extends Subsection {
  constructor(props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateBranch = this.updateBranch.bind(this)
    this.updateList = this.updateList.bind(this)

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
      HasViolence: this.props.HasViolence,
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
      HasViolence: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item && item.Item) || {}
    const dates = DateSummary(o.Dates)
    const details = (o.Organization || {}).value || ''

    return Summary({
      type: i18n.t('legal.associations.violence.collection.item'),
      index,
      left: details,
      right: dates,
      placeholder: i18n.t('legal.associations.violence.collection.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content legal-associations-violence"
        {...super.dataAttributes()}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.associations.violence')}</h1>
        <Branch
          name="has_violence"
          label={i18n.t('legal.associations.violence.heading.title')}
          labelSize="h4"
          className="legal-associations-violence-has-violence"
          {...this.props.HasViolence}
          warning
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateBranch}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasViolence.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={ViolenceValidator}
            description={i18n.t('legal.associations.violence.collection.description')}
            appendTitle={i18n.t('legal.associations.violence.collection.appendTitle')}
            appendLabel={i18n.t('legal.associations.violence.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <MembershipViolenceItem
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

MembershipViolence.defaultProps = {
  name: 'violence',
  HasViolence: {},
  List: Accordion.defaultList,
  defaultState: true,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'legal',
  subsection: 'associations/membership-violence-or-force',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('legal.associations.membership-violence-or-force', data)),
  scrollToBottom: '',
}

export default connectLegalSection(MembershipViolence, sectionConfig)
