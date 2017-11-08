import React from 'react'
import { i18n } from '../../../../config'
import { IdentificationContactInformationValidator, ContactEmailValidator, ContactPhoneNumberValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Email, Accordion, Telephone } from '../../../Form'
import { Summary, TelephoneSummary } from '../../../Summary'

export default class ContactInformation extends SubsectionElement {
  constructor (props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateEmails = this.updateEmails.bind(this)
    this.updatePhoneNumbers = this.updatePhoneNumbers.bind(this)
  }

  update (queue) {
    const delay = this.props.Emails.length && this.props.PhoneNumbers.length ? 0 : 100

    // Little bit of delay here because on first load both accordions send
    // updates which clobber one another.
    window.setTimeout(() => {
      this.props.onUpdate({
        Emails: this.props.Emails,
        PhoneNumbers: this.props.PhoneNumbers,
        ...queue
      })
    }, delay)
  }

  updateEmails (values) {
    this.update({
      Emails: values
    })
  }

  updatePhoneNumbers (values) {
    this.update({
      PhoneNumbers: values.items
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  emailSummary (item, index) {
    const addr = item.Item && item.Item.value ? item.Item.value : ''
    return Summary({
      type: i18n.t('identification.contacts.collection.summary.email'),
      index: index,
      left: addr,
      right: null,
      placeholder: i18n.m('identification.contacts.collection.summary.unknownEmail')
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  phoneNumberSummary (item, index) {
    const number = TelephoneSummary(item)
    return Summary({
      type: i18n.t('identification.contacts.collection.summary.phoneNumber'),
      index: index,
      left: number,
      right: null,
      placeholder: i18n.m('identification.contacts.collection.summary.unknownPhone')
    })
  }

  firstItemRequired (item, index, initial, callback) {
    if (index === 0) {
      return <span className="required">{callback()}</span>
    }

    return callback()
  }

  render () {
    const klass = `${this.props.className || ''}`.trim()
    let emails = this.props.Emails
    let phoneNumbers = this.props.PhoneNumbers
    if (this.props.shouldFilterEmptyItems) {
      emails = emails.filter(x => {
        const item = x.Item || {}
        return item.value
      })
      phoneNumbers = phoneNumbers.filter(x => {
        const item = x.Item || {}
        return item.number || item.noNumber
      })
    }

    if (emails.items.length < this.props.minimumEmails) {
      emails = this.props.Emails.items.slice(0, this.props.minimumEmails)
    }

    if (phoneNumbers.length < this.props.minimumPhoneNumbers) {
      phoneNumbers = this.props.PhoneNumbers.slice(0, this.props.minimumPhoneNumbers)
    }

    return (
      <div className="contact">
        <Field title={i18n.t('identification.contacts.title')}
               titleSize="h2"
               className="no-margin-bottom"
               optional={true}
               />

        <Field title={i18n.t('identification.contacts.heading.email')}
               titleSize="h3"
               help="identification.contacts.help.email"
               optional={true}
               className="no-margin-bottom">
          {i18n.m('identification.contacts.para.email')}
        </Field>

        <div className={klass + ' email-collection'}>
          <Accordion minimum={this.props.minimumEmails}
                     {...emails}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateEmails}
                     onError={this.handleError}
                     required={this.props.required}
                     summary={this.emailSummary}
                     customDetails={this.firstItemRequired}
                     validator={ContactEmailValidator}
                     description={i18n.t('identification.contacts.collection.summary.title')}
                     appendLabel={i18n.t('identification.contacts.collection.append')}>
            <Field title={i18n.t('identification.contacts.label.email')}
                   titleSize="label"
                   scrollIntoView={this.props.scrollIntoView}
                   optional={true}>
              <Email name="Item"
                     placeholder={i18n.t('identification.contacts.placeholder.email')}
                     bind={true}
                     required={this.props.required}
                     />
            </Field>
          </Accordion>
        </div>

        <Field title={i18n.t('identification.contacts.heading.phoneNumber')}
               titleSize="h3"
               optional={true}
               help="identification.contacts.help.phoneNumber"
               className="no-margin-bottom">
          {i18n.m('identification.contacts.para.phoneNumber')}
        </Field>

        <div className={klass + ' telephone-collection'}>
          <Accordion minimum={this.props.minimumPhoneNumbers}
                     items={phoneNumbers}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updatePhoneNumbers}
                     onError={this.handleError}
                     required={this.props.required}
                     customDetails={this.firstItemRequired}
                     validator={ContactPhoneNumberValidator}
                     summary={this.phoneNumberSummary}
                     description={i18n.t('identification.contacts.collection.phoneNumbers.summary.title')}
                     appendLabel={i18n.t('identification.contacts.collection.phoneNumbers.append')}>
            <Field scrollIntoView={this.props.scrollIntoView}
                   optional={true}>
              <Telephone name="Item"
                         placeholder={i18n.t('identification.contacts.placeholder.telephone')}
                         allowNotApplicable={false}
                         bind={true}
                         required={this.props.required}
                         />
            </Field>
          </Accordion>
        </div>
      </div>
    )
  }
}

ContactInformation.defaultProps = {
  Emails: {
    items: []
  },
  PhoneNumbers: [],
  minimumPhoneNumbers: 2,
  minimumEmails: 2,
  shouldFilterEmptyItems: false,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'contacts',
  dispatch: () => {},
  validator: (state, props) => {
    return new IdentificationContactInformationValidator(props).isValid()
  },
  defaultState: true
}
