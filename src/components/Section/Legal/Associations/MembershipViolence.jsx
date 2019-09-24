import React from 'react'
import i18n from 'util/i18n'
import { Summary, DateSummary } from 'components/Summary'
import { Accordion, Branch, Show } from 'components/Form'
import {
  LEGAL,
  LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE,
} from 'config/formSections/legal'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import MembershipViolenceItem from './MembershipViolenceItem'

const sectionConfig = {
  key: LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE.key,
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
    const { errors } = this.props
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content legal-associations-violence"
        data-section={LEGAL.key}
        data-subsection={LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE.key}
      >
        <h1 className="section-header">{i18n.t('legal.subsection.associations.violence')}</h1>
        <Branch
          name="has_violence"
          label={i18n.t('legal.associations.violence.heading.title')}
          labelSize="h4"
          className="legal-associations-violence-has-violence"
          {...this.props.HasViolence}
          warning={true}
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
            errors={accordionErrors}
            description={i18n.t('legal.associations.violence.collection.description')}
            appendTitle={i18n.t('legal.associations.violence.collection.appendTitle')}
            appendLabel={i18n.t('legal.associations.violence.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <MembershipViolenceItem
              name="Item"
              bind={true}
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
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(MembershipViolence, sectionConfig)
