import React from 'react'
import { i18n } from 'config'
import schema from 'schema'
import validate, { ContactValidator } from 'validators'
import { Summary, NameText, DateSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import { FOREIGN, FOREIGN_BUSINESS_CONTACT } from 'config/formSections/foreign'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import ContactItem from './ContactItem'

const sectionConfig = {
  key: FOREIGN_BUSINESS_CONTACT.key,
  section: FOREIGN.name,
  store: FOREIGN.store,
  subsection: FOREIGN_BUSINESS_CONTACT.name,
  storeKey: FOREIGN_BUSINESS_CONTACT.storeKey,
}

export class Contact extends Subsection {
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
      HasForeignContact: this.props.HasForeignContact,
      ...queue,
    })
  }

  updateHasForeignContact = (values) => {
    this.update({
      HasForeignContact: values,
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
    const date = DateSummary(obj.Date)
    const name = NameText(obj.Name)
    const govt = ((obj.Governments || {}).value || []).join(', ')

    let display = ''
    if (name && govt) {
      display = (
        <span className="title-case">
          {`${name} (${govt})`}
        </span>
      )
    } else if (name) {
      display = <span className="title-case">{name}</span>
    } else if (govt) {
      display = <span className="title-case">{govt}</span>
    }

    return Summary({
      type: i18n.t('foreign.business.contact.collection.summary.item'),
      index,
      left: display,
      right: date,
      placeholder: i18n.t('foreign.business.contact.collection.summary.unknown'),
    })
  }

  render() {
    return (
      <div
        className="section-content foreign-business-contact"
        data-section={FOREIGN.key}
        data-subsection={FOREIGN_BUSINESS_CONTACT.key}
      >
        <h1 className="section-header">{i18n.t('foreign.subsection.business.contact')}</h1>
        {i18n.m('foreign.business.contact.para.intro')}
        <Branch
          name="has_foreign_contact"
          label={i18n.t('foreign.business.contact.heading.title')}
          labelSize="h4"
          {...this.props.HasForeignContact}
          warning={true}
          onUpdate={this.updateHasForeignContact}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        >
          {i18n.m('foreign.business.contact.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignContact.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            validator={ContactValidator}
            summary={this.summary}
            description={i18n.t('foreign.business.contact.collection.summary.title')}
            appendTitle={i18n.t('foreign.business.contact.collection.appendTitle')}
            appendMessage={i18n.m('foreign.business.contact.collection.appendMessage')}
            appendLabel={i18n.t('foreign.business.contact.collection.append')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <ContactItem
              name="Item"
              bind={true}
              scrollIntoView={this.props.scrollIntoView}
              required={this.props.required}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Contact.defaultProps = {
  name: 'Contact',
  HasForeignContact: {},
  List: Accordion.defaultList,
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'foreign',
  subsection: 'business/contact',
  addressBooks: {},
  dispatch: () => {},
  validator: data => validate(schema('foreign.business.contact', data)),
  defaultState: true,
  scrollToBottom: '',
}

export default connectSubsection(Contact, sectionConfig)
