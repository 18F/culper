import React from 'react'
import { i18n } from '../../../../config'
import {
  IdentificationContactInformationValidator,
  ContactPhoneNumberValidator
} from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import {
  Field,
  Email,
  Accordion,
  AccordionItem,
  Telephone
} from '../../../Form'
import { Summary, TelephoneSummary } from '../../../Summary'

export default class ContactInformation extends SubsectionElement {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.updateHomeEmail = this.updateHomeEmail.bind(this)
    this.updateWorkEmail = this.updateWorkEmail.bind(this)
    this.updatePhoneNumbers = this.updatePhoneNumbers.bind(this)
  }

  update(queue) {
    this.props.onUpdate({
      HomeEmail: this.props.HomeEmail,
      WorkEmail: this.props.WorkEmail,
      PhoneNumbers: this.props.PhoneNumbers,
      ...queue
    })
  }

  updateHomeEmail(values) {
    this.update({
      HomeEmail: values
    })
  }

  updateWorkEmail(values) {
    this.update({
      WorkEmail: values
    })
  }

  updatePhoneNumbers(values) {
    this.update({
      PhoneNumbers: values
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  phoneNumberSummary(item, index) {
    const number = TelephoneSummary((item.Item || {}).Telephone)
    return Summary({
      type: i18n.t('identification.contacts.collection.summary.phoneNumber'),
      index: index,
      left: number,
      right: null,
      placeholder: i18n.t(
        'identification.contacts.collection.summary.unknownPhone'
      )
    })
  }

  firstItemRequired(item, index, initial, callback) {
    if (index === 0) {
      return <span className="required">{callback()}</span>
    }

    return callback()
  }

  uniquePhoneTypes() {
    return new IdentificationContactInformationValidator(
      this.props
    ).validPhoneTypes()
  }

  render() {
    const klass = `${this.props.className || ''}`.trim()
    let phoneNumbers = this.props.PhoneNumbers

    if (this.props.shouldFilterEmptyItems) {
      let filtered = phoneNumbers.items.length
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

    let phoneMin = this.props.minimumPhoneNumbers
    if (phoneNumbers.items.length === 0) {
      phoneMin = this.props.shouldFilterEmptyItems ? 1 : 2
    }

    return (
      <div
        className="section-content contact"
        {...super.dataAttributes(this.props)}>
        <Field
          title={i18n.t('identification.contacts.title')}
          titleSize="h2"
          className="no-margin-bottom"
          optional={true}
        />

        <Field
          title={i18n.t('identification.contacts.heading.email')}
          titleSize="h3"
          help="identification.contacts.help.email"
          optional={true}
          className="no-margin-bottom"
          scrollIntoView={false}>
          {i18n.m('identification.contacts.para.email')}
        </Field>

        <Field
          title={i18n.t('identification.contacts.heading.emailHome')}
          titleSize="label"
          optional={true}
          scrollIntoView={this.props.scrollIntoView}>
          <Email
            name="HomeEmail"
            className="email-home"
            {...this.props.HomeEmail}
            onUpdate={this.updateHomeEmail}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('identification.contacts.heading.emailWork')}
          titleSize="label"
          optional={true}
          scrollIntoView={this.props.scrollIntoView}>
          <Email
            name="WorkEmail"
            className="email-work"
            {...this.props.WorkEmail}
            onUpdate={this.updateWorkEmail}
            onError={this.props.onError}
          />
        </Field>

        <Field
          title={i18n.t('identification.contacts.heading.phoneNumber')}
          titleSize="h3"
          optional={true}
          help="identification.contacts.help.phoneNumber"
          className="no-margin-bottom"
          scrollIntoView={false}>
          {i18n.m('identification.contacts.para.phoneNumber')}
        </Field>

        <Field
          errors={[{ code: 'validPhoneTypes', valid: this.uniquePhoneTypes() }]}
          className={this.uniquePhoneTypes() && 'hidden'}
        />

        <div className={klass + ' telephone-collection'}>
          <Accordion
            {...phoneNumbers}
            minimum={phoneMin}
            defaultState={this.props.defaultState}
            onUpdate={this.updatePhoneNumbers}
            onError={this.handleError}
            required={this.props.required}
            customDetails={this.firstItemRequired}
            validator={ContactPhoneNumberValidator}
            summary={this.phoneNumberSummary}
            description={i18n.t(
              'identification.contacts.collection.phoneNumbers.summary.title'
            )}
            appendLabel={i18n.t(
              'identification.contacts.collection.phoneNumbers.append'
            )}
            scrollIntoView={this.props.scrollIntoView}>
            <AccordionItem
              scrollIntoView={this.props.scrollIntoView}
              required={this.props.required}>
              <Field optional={true} scrollIntoView={this.props.scrollIntoView}>
                <Telephone
                  name="Telephone"
                  typeClass="title"
                  showNumberType={true}
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
  HomeEmail: {},
  WorkEmail: {},
  PhoneNumbers: Accordion.defaultList,
  minimumPhoneNumbers: 1,
  shouldFilterEmptyItems: false,
  onUpdate: queue => {},
  onError: (value, arr) => {
    return arr
  },
  section: 'identification',
  subsection: 'contacts',
  dispatch: () => {},
  validator: data => {
    return new IdentificationContactInformationValidator(data).isValid()
  },
  defaultState: true
}
