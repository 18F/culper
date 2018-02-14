import React from 'react'
import { i18n } from '../../../../config'
import { IdentificationContactInformationValidator, ContactEmailValidator, ContactPhoneNumberValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Email, Accordion, AccordionItem, Telephone } from '../../../Form'
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
      PhoneNumbers: values
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  emailSummary (item, index) {
    const email = (item.Item || {}).Email
    const addr = email && email.value ? email.value : ''
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
    const number = TelephoneSummary((item.Item || {}).Telephone)
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
      let filtered = emails.items.length
      const filteredEmails = emails.items.filter(x => {
        const item = x.Item || {}
        if (!item.Email || !item.Email.value) {
          filtered--
          if (filtered < 1) {
            return item
          }
        }
        return item.Email && item.Email.value
      })
      emails.items = filteredEmails

      filtered = phoneNumbers.items.length
      const filteredPhoneNumbers = phoneNumbers.items.filter(x => {
        const item = x.Item || {}
        if (!item.Telephone || !item.Telephone.value) {
          filtered--
          if (filtered < 1) {
            return item
          }
        }
        return (item.Telephone && item.Telephone.number) || item.noNumber
      })
      phoneNumbers.items = filteredPhoneNumbers
    }

    let emailMin = this.props.minimumEmails
    if (emails.items.length === 0) {
      emailMin = this.props.shouldFilterEmptyItems ? 1 : 2
    }

    let phoneMin = this.props.minimumPhoneNumbers
    if (phoneNumbers.items.length === 0) {
      phoneMin = this.props.shouldFilterEmptyItems ? 1 : 2
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
               className="no-margin-bottom"
               scrollIntoView={false}>
          {i18n.m('identification.contacts.para.email')}
        </Field>

        <div className={klass + ' email-collection'}>
          <Accordion {...emails}
                     minimum={emailMin}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateEmails}
                     onError={this.handleError}
                     required={this.props.required}
                     summary={this.emailSummary}
                     validator={ContactEmailValidator}
                     description={i18n.t('identification.contacts.collection.summary.title')}
                     appendLabel={i18n.t('identification.contacts.collection.append')}
                     scrollIntoView={this.props.scrollIntoView}>
            <AccordionItem scrollIntoView={this.props.scrollIntoView}
                           required={false}>
              <Field title={i18n.t('identification.contacts.label.email')}
                     titleSize="label"
                     optional={true}
                     scrollIntoView={this.props.scrollIntoView}>
                <Email name="Email"
                       placeholder={i18n.t('identification.contacts.placeholder.email')}
                       bind={true}
                       />
              </Field>
            </AccordionItem>
          </Accordion>
        </div>

        <Field title={i18n.t('identification.contacts.heading.phoneNumber')}
               titleSize="h3"
               optional={true}
               help="identification.contacts.help.phoneNumber"
               className="no-margin-bottom"
               scrollIntoView={false}>
          {i18n.m('identification.contacts.para.phoneNumber')}
        </Field>

        <div className={klass + ' telephone-collection'}>
          <Accordion {...phoneNumbers}
                     minimum={phoneMin}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updatePhoneNumbers}
                     onError={this.handleError}
                     required={this.props.required}
                     customDetails={this.firstItemRequired}
                     validator={ContactPhoneNumberValidator}
                     summary={this.phoneNumberSummary}
                     description={i18n.t('identification.contacts.collection.phoneNumbers.summary.title')}
                     appendLabel={i18n.t('identification.contacts.collection.phoneNumbers.append')}
                     scrollIntoView={this.props.scrollIntoView}>
            <AccordionItem scrollIntoView={this.props.scrollIntoView}
                           required={this.props.required}>
              <Field optional={true}
                     scrollIntoView={this.props.scrollIntoView}>
                <Telephone name="Telephone"
                           placeholder={i18n.t('identification.contacts.placeholder.telephone')}
                           allowNotApplicable={false}
                           bind={true}
                           />
              </Field>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    )
  }
}

ContactInformation.defaultProps = {
  Emails: Accordion.defaultList,
  PhoneNumbers: Accordion.defaultList,
  minimumPhoneNumbers: 1,
  minimumEmails: 1,
  shouldFilterEmptyItems: false,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'contacts',
  dispatch: () => {},
  validator: (data) => {
    return new IdentificationContactInformationValidator(data).isValid()
  },
  defaultState: true
}
