import React from 'react'
import { i18n } from '../../../../config'
import { ForeignContactsValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Branch, Show, Accordion } from '../../../Form'
import ForeignNational from './ForeignNational'

export default class Contacts extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      HasForeignContacts: props.HasForeignContacts,
      List: props.List,
      ListBranch: props.ListBranch
    }

    this.updateHasForeignContacts = this.updateHasForeignContacts.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, value) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasForeignContacts: this.state.HasForeignContacts,
          List: this.state.List,
          ListBranch: this.state.ListBranch
        })
      }
    })
  }

  updateHasForeignContacts (value) {
    this.onUpdate('HasForeignContacts', value)
  }

  updateList (values) {
    this.onUpdate('List', values.items)
    this.onUpdate('ListBranch', values.branch)
  }

  summary (item, index) {
    const obj = (item || {}).Item || {}
    const name = obj.Name || {}
    const display = `${name.first || ''} ${name.middle || ''} ${name.last || ''}`.trim() || i18n.t('foreign.contacts.collection.summary.unknown')

    return (
      <span>
        <span className="index">{i18n.t('foreign.contacts.collection.summary.item')} {index + 1}:</span>
        <span><strong>{display}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="foreign-contacts">
        <h3>{i18n.t('foreign.contacts.heading.title')}</h3>
        {i18n.t('foreign.contacts.para.includes')}
        <Branch name="has_foreign_contacts"
                title={i18n.t('foreign.contacts.para.definition')}
                help="foreign.contacts.help.branch"
                value={this.state.HasForeignContacts}
                onUpdate={this.updateHasForeignContacts}
                onError={this.handleError}
                />
        <Show when={this.state.HasForeignContacts === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     branch={this.state.ListBranch}
                     onUpdate={this.updateList}
                     onError={this.handleError}
                     summary={this.summary}
                     description={i18n.t('foreign.contacts.collection.summary.title')}
                     appendTitle={i18n.t('foreign.contacts.collection.appendTitle')}
                     appendMessage={i18n.m('foreign.contacts.collection.appendMessage')}
                     appendLabel={i18n.t('foreign.contacts.collection.append')}>
            <ForeignNational name="Item" bind={true} />
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
  onError: (value, arr) => { return arr },
  section: 'foreign',
  subsection: 'contacts',
  dispatch: () => {},
  validator: (state, props) => {
    return new ForeignContactsValidator(state, props).isValid()
  }
}
