import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { ForeignNationalValidator } from 'validators'
import { Summary, NameSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_CONTACTS } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import ForeignNational from './ForeignNational'

const sectionConfig = {
  key: FOREIGN_CONTACTS.key,
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_CONTACTS.name,
  storeKey: FOREIGN_CONTACTS.storeKey,
}

export class Contacts extends Subsection {
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
      HasForeignContacts: this.props.HasForeignContacts,
      List: this.props.List,
      ...queue,
    })
  }

  updateHasForeignContacts = (values) => {
    this.update({
      HasForeignContacts: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  summary = (item, index) => {
    const obj = (item || {}).Item || {}
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.contacts.collection.summary.item'),
      index,
      left: name,
      placeholder: i18n.t('foreign.contacts.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content foreign-contacts"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_CONTACTS.key}
      >
        <h1 className="section-header">{i18n.t('foreign.destination.contacts')}</h1>
        <Branch
          name="has_foreign_contacts"
          label={i18n.t('foreign.contacts.heading.title')}
          labelSize="h4"
          {...this.props.HasForeignContacts}
          warning={true}
          onUpdate={this.updateHasForeignContacts}
          onError={this.handleError}
          required={this.props.required}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('foreign.contacts.para.definition')}
          {i18n.m('foreign.contacts.para.includes')}
        </Branch>
        <Show when={this.props.HasForeignContacts.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={ForeignNationalValidator}
            summary={this.summary}
            description={i18n.t('foreign.contacts.collection.summary.title')}
            appendTitle={i18n.t('foreign.contacts.collection.appendTitle')}
            appendMessage={i18n.m('foreign.contacts.collection.appendMessage')}
            appendLabel={i18n.t('foreign.contacts.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <ForeignNational
              name="Item"
              applicantBirthdate={this.props.applicantBirthdate}
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

Contacts.defaultProps = {
  HasForeignContacts: {},
  List: {},
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'contacts',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('foreign.contacts', data)),
  defaultState: true,
  scrollToBottom: '',
}

export default connectSubsection(Contacts, sectionConfig)
