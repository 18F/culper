import React from 'react'
import { i18n } from '../../../../config'
import schema from '../../../../schema'
import validate, { ContactEmailValidator, ContactPhoneNumberValidator } from '../../../../validators'
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

  render () {
    const klass = `${this.props.className || ''}`.trim()
    const phoneNumberItems = (this.props.PhoneNumbers || {}).items || []
    let phoneNumbers = this.props.filterEmpty
      ? phoneNumberItems.filter(x => {
        const item = x.Item || {}
        return item.number || item.noNumber
      })
      : phoneNumberItems

    if (phoneNumbers.length < this.props.minimumPhoneNumbers) {
      phoneNumbers = phoneNumberItems.slice(0, this.props.minimumPhoneNumbers)
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
          <Accordion minimum={2}
                     {...this.props.Emails}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updateEmails}
                     onError={this.handleError}
                     required={this.props.required}
                     summary={this.emailSummary}
                     validator={ContactEmailValidator}
                     description={i18n.t('identification.contacts.collection.summary.title')}
                     appendLabel={i18n.t('identification.contacts.collection.append')}>
            <AccordionItem scrollIntoView={this.props.scrollIntoView}
                           required={this.props.required}>
              <Field title={i18n.t('identification.contacts.label.email')}
                     titleSize="label"
                     adjustFor="labels">
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
               className="no-margin-bottom">
          {i18n.m('identification.contacts.para.phoneNumber')}
        </Field>

        <div className={klass + ' telephone-collection'}>
          <Accordion minimum={this.props.minimumPhoneNumbers}
                     {...{ items: phoneNumbers, branch: null }}
                     defaultState={this.props.defaultState}
                     onUpdate={this.updatePhoneNumbers}
                     onError={this.handleError}
                     required={this.props.required}
                     validator={ContactPhoneNumberValidator}
                     summary={this.phoneNumberSummary}
                     description={i18n.t('identification.contacts.collection.phoneNumbers.summary.title')}
                     appendLabel={i18n.t('identification.contacts.collection.phoneNumbers.append')}>
            <AccordionItem scrollIntoView={this.props.scrollIntoView}
                           required={this.props.required}>
              <Field adjustFor="telephone">
                <Telephone name="PhoneNumber"
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
  Emails: [],
  PhoneNumbers: [],
  minimumPhoneNumbers: 2,
  shouldFilterEmptyNumbers: false,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'contacts',
  dispatch: () => {},
  validator: (state, props) => {
    return validate(schema('identification.contacts', props))
  },
  defaultState: true
}
