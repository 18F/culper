import React from 'react'
import { i18n } from '../../../../config'
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
      ListBranch: this.props.ListBranch,
      HasForeignContact: this.props.HasForeignContact,
      ...queue
    })
  }

  updateHasForeignContact (values) {
    this.update({
      HasForeignContact: values,
      List: values === 'Yes' ? this.props.List : [],
      ListBranch: values === 'Yes' ? this.props.ListBranch : ''
    })
  }

  updateList (values) {
    this.update({
      List: values.items,
      ListBranch: values.branch
    })
  }

  summary (item, index) {
    const obj = ((item && item.Item) || {})
    const date = DateSummary(obj.Date)
    const name = NameSummary(obj.Name)
    const govt = ((obj.Governments || {}).value || []).map(x => x.name).join(', ')
    const govtParen = name && govt ? ` (${govt})` : ''

    return Summary({
      type: i18n.t('foreign.business.contact.collection.summary.item'),
      index: index,
      left: `${name}${govtParen}`,
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
                labelSize="h3"
                help="foreign.business.contact.help.branch"
                value={this.props.HasForeignContact}
                warning={true}
                onUpdate={this.updateHasForeignContact}
                required={this.props.required}
                onError={this.handleError}
                scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('foreign.business.contact.para.branch')}
        </Branch>

        <Show when={this.props.HasForeignContact === 'Yes'}>
          <Accordion items={this.props.List}
                     defaultState={this.props.defaultState}
                     scrollToBottom={this.props.scrollToBottom}
                     branch={this.props.ListBranch}
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
  HasForeignContact: '',
  List: [],
  ListBranch: '',
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'business/contact',
  addressBooks: {},
  dispatch: (action) => {},
  validator: (state, props) => {
    return new ForeignBusinessContactValidator(props).isValid()
  },
  defaultState: true,
  scrollToBottom: ''
}
