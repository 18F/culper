import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, NameSummary, DateSummary } from '../../../Summary'
import { ForeignBusinessContactValidator, ContactValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import ContactItem from './ContactItem'

export default class Contact extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateHasForeignContact = this.updateHasForeignContact.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      List: this.props.List,
      HasForeignContact: this.props.HasForeignContact,
      ...queue
    })
  }

  updateHasForeignContact (values) {
    this.update({
      HasForeignContact: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} }
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  summary (item, index) {
    const obj = ((item && item.Item) || {})
    const date = DateSummary(obj.Date)
    const name = NameSummary(obj.Name)
    const govt = ((obj.Governments || {}).value || []).join(', ')
    const govtParen = name && govt ? ` (${govt})` : ''
    const nameAndGovt = <span>{name}{govtParen}</span>

    return Summary({
      type: i18n.t('foreign.business.contact.collection.summary.item'),
      index: index,
      left: nameAndGovt,
      right: date,
      placeholder: i18n.m('foreign.business.contact.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-business-contact">
        {i18n.m('foreign.business.contact.para.intro')}

        <Branch name="has_foreign_contact"
                label={i18n.t('foreign.business.contact.heading.title')}
                labelSize="h2"
                {...this.props.HasForeignContact}
                warning={true}
                onUpdate={this.updateHasForeignContact}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.business.contact.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignContact.value === 'Yes'}>
          <Accordion {...this.props.List}
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
                     scrollIntoView={this.props.scrollIntoView}>
            <ContactItem name="Item"
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
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/contact',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (data) => {
    return validate(schema('foreign.business.contact', data))
  },
  defaultState: true,
  scrollToBottom: ''
}
