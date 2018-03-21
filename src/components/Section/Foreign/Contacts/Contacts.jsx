import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate from '../../../../validators'
import { Summary, NameSummary } from '../../../Summary'
import { ForeignContactsValidator, ForeignNationalValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Branch, Show, Accordion } from '../../../Form'
import ForeignNational from './ForeignNational'

export default class Contacts extends SubsectionElement {
  constructor (props) {
    super(props)

    this.updateHasForeignContacts = this.updateHasForeignContacts.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      HasForeignContacts: this.props.HasForeignContacts,
      List: this.props.List,
      ...queue
    })
  }

  updateHasForeignContacts (values) {
    this.update({
      HasForeignContacts: values,
      List: values.value === 'Yes' ? this.props.List : []
    })
  }

  updateList (values) {
    this.update({
      List: values
    })
  }

  summary (item, index) {
    const obj = (item || {}).Item || {}
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.contacts.collection.summary.item'),
      index: index,
      left: name,
      placeholder: i18n.t('foreign.contacts.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="section-content foreign-contacts" {...super.dataAttributes(this.props)}>
        {i18n.m('foreign.contacts.para.definition')}

        <Branch name="has_foreign_contacts"
                label={i18n.t('foreign.contacts.heading.title')}
                labelSize="h2"
                {...this.props.HasForeignContacts}
                warning={true}
                onUpdate={this.updateHasForeignContacts}
                onError={this.handleError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.contacts.para.includes')}
        </Branch>
        <Show when={this.props.HasForeignContacts.value === 'Yes'}>
          <Accordion {...this.props.List}
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
                     scrollIntoView={this.props.scrollIntoView}>
            <ForeignNational name="Item"
                             bind={true}
                             addressBooks={this.props.addressBooks}
                             dispatch={this.props.dispatch}
                             required={this.props.required}
                             scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Contacts.defaultProps = {
  HasForeignContacts: {},
  List: {},
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'contacts',
  addressBooks: {},
  dispatch: () => {},
  validator: (data) => {
    return validate(schema('foreign.contacts', data))
  },
  defaultState: true,
  scrollToBottom: ''
}
