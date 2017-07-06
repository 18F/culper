import React from 'react'
import { i18n } from '../../../../config'
import { ContactInformationValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Email, Accordion, Telephone } from '../../../Form'
import { TelephoneSummary } from '../../../Summary'

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
      Emails: values.items
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
    const addr = item.Email && item.Email.value ? item.Email.value : i18n.t('identification.contacts.collection.summary.unknownEmail')
    return (
      <span>
        <span className="index">{i18n.t('identification.contacts.collection.summary.email')} {index + 1}:</span>
        <span><strong>{addr}</strong></span>
      </span>
    )
  }

  /**
   * Assists in rendering the summary section.
   */
  phoneNumberSummary (item, index) {
    const number = TelephoneSummary(item, i18n.t('identification.contacts.collection.summary.unknownPhone'))
    return (
      <span>
        <span className="index">{i18n.t('identification.contacts.collection.summary.phoneNumber')} {index + 1}:</span>
        <span><strong>{number}</strong></span>
      </span>
    )
  }

  render () {
    const klass = `${this.props.className || ''}`.trim()

    return (
      <div className="contact">
        <h3>{i18n.t('identification.contacts.heading.email')}</h3>
        <p>{i18n.t('identification.contacts.para.email')}</p>
        <div className={klass + ' email-collection'}>
          <Accordion minimum={2}
                     items={this.props.Emails}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateEmails}
                     onError={this.handleError}
                     summary={this.emailSummary}
                     description={i18n.t('identification.contacts.collection.summary.title')}
                     appendLabel={i18n.t('identification.contacts.collection.append')}>
            <Field help="identification.contacts.help.email"
                   adjustFor="labels">
              <Email name="Email"
                     label={i18n.t('identification.contacts.label.email')}
                     placeholder={i18n.t('identification.contacts.placeholder.email')}
                     bind={true}
                     />
            </Field>
          </Accordion>
        </div>

        <h3>{i18n.t('identification.contacts.heading.phoneNumber')}</h3>
        <p>{i18n.t('identification.contacts.para.phoneNumber')}</p>
        <div className={klass + ' telephone-collection'}>
          <Accordion minimum={2}
                     items={this.props.PhoneNumbers}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updatePhoneNumbers}
                     onError={this.handleError}
                     summary={this.phoneNumberSummary}
                     description={i18n.t('identification.contacts.collection.phoneNumbers.summary.title')}
                     appendLabel={i18n.t('identification.contacts.collection.phoneNumbers.append')}>
            <Field help="identification.contacts.help.phoneNumber">
              <Telephone name="Telephone"
                         placeholder={i18n.t('identification.contacts.placeholder.telephone')}
                         bind={true}
                         />
            </Field>
          </Accordion>
        </div>
      </div>
    )
  }
}

ContactInformation.defaultProps = {
  Emails: [],
  PhoneNumbers: [],
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'contacts',
  dispatch: () => {},
  validator: (state, props) => {
    return new ContactInformationValidator(props, props).isValid()
  },
  defaultState: true
}
