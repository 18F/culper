import React from 'react'
import { i18n } from '../../../../config'
import { Summary, NameSummary } from '../../../Summary'
import { ForeignContactsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
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
      ListBranch: this.props.ListBranch,
      ...queue
    })
  }

  updateHasForeignContacts (value) {
    this.update({
      HasForeignContacts: value,
      List: value === 'Yes' ? this.props.List : [],
      ListBranch: value === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  summary (item, index) {
    const obj = (item || {}).Item || {}
    const name = NameSummary(obj.Name)

    return Summary({
      type: i18n.t('foreign.contacts.collection.summary.item'),
      index: index,
      left: name,
      right: null,
      placeholder: i18n.m('foreign.contacts.collection.summary.unknown')
    })
  }

  render () {
    return (
      <div className="foreign-contacts">
        {i18n.m('foreign.contacts.para.definition')}
        <h3>{i18n.t('foreign.contacts.heading.title')}</h3>
        {i18n.m('foreign.contacts.para.includes')}
        <Branch name="has_foreign_contacts"
                value={this.props.HasForeignContacts}
                warning={true}
                onUpdate={this.updateHasForeignContacts}
                onError={this.handleError}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}
                />
        <Show when={this.props.HasForeignContacts === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
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
                         bind={true}
                         required={this.props.required}
                         scrollIntoView={this.props.scrollIntoView} />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Contacts.defaultProps = {
  HasForeignContacts: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'contacts',
  addressBooks: {},
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignContactsValidator(props, props).isValid()
  },
  defaultState: true,
  scrollToBottom: ''
}
