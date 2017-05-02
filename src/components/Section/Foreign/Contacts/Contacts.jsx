import React from 'react'
import { i18n } from '../../../../config'
import { ForeignContactsValidator } from '../../../../validators'
import { ValidationElement, Branch, Show, Accordion } from '../../../Form'
import ForeignNational from './ForeignNational'

export default class Contacts extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      HasForeignContacts: props.HasForeignContacts,
      List: props.List,
      error: false,
      valid: false,
      errorCodes: []
    }

    this.updateHasForeignContacts = this.updateHasForeignContacts.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  onUpdate (name, value) {
    this.setState({ [name]: value }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          HasForeignContacts: this.state.HasForeignContacts,
          List: this.state.List
        })
      }
    })
  }

  updateHasForeignContacts (value) {
    this.onUpdate('HasForeignContacts', value)
  }

  updateList (items) {
    this.onUpdate('List', items)
  }

  /**
   * Handle the validation event.
   */
  handleValidation (event, status, error) {
    if (!event) {
      return
    }

    let codes = super.mergeError(this.state.errorCodes, super.flattenObject(error))
    let complexStatus = null
    if (codes.length > 0) {
      complexStatus = false
    } else if (this.isValid()) {
      complexStatus = true
    }

    this.setState({error: complexStatus === false, valid: complexStatus === true, errorCodes: codes}, () => {
      const e = { [this.props.name]: codes }
      const s = { [this.props.name]: { status: complexStatus } }
      super.handleValidation(event, s, e)
    })
  }

  isValid () {
    return new ForeignContactsValidator(this.state, null).isValid()
  }

  summary (item, index) {
    const obj = (item || {}).Item || {}
    const name = obj.Name || {}
    const display = `${name.first || ''} ${name.middle || ''} ${name.last || ''}`.trim() || i18n.t('foreign.contacts.collection.summary.unknown')
    const countries = ((obj.Citizenship || {}).value || []).map(x => {
      return x.name
    })

    return (
      <span>
        <span className="index">{i18n.t('foreign.contacts.collection.summary.item')} {index + 1}:</span>
        <span><strong>{display}</strong></span>
        <span className="dates"><strong>{countries.shift()}</strong></span>
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
                onValidate={this.handleValidation}
                />
        <Show when={this.state.HasForeignContacts === 'Yes'}>
          <Accordion minimum="1"
                     items={this.state.List}
                     onUpdate={this.updateList}
                     onValidate={this.handleValidation}
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
  List: []
}
