import React from 'react'

import { i18n } from 'config'

import {
  IdentificationContactInformationValidator,
  ContactPhoneNumberValidator,
} from 'validators'

import {
  Field,
  Email,
  Accordion,
  AccordionItem,
  Telephone,
} from 'components/Form'
import { Summary, TelephoneSummary } from 'components/Summary'
import { IDENTIFICATION, IDENTIFICATION_CONTACTS } from 'config/formSections/identification'

import connectSubsection from 'components/Section/shared/SubsectionConnector'
import Subsection from 'components/Section/shared/Subsection'


const sectionConfig = {
  key: IDENTIFICATION_CONTACTS.key,
  section: IDENTIFICATION.name,
  store: IDENTIFICATION.store,
  subsection: IDENTIFICATION_CONTACTS.name,
  storeKey: IDENTIFICATION_CONTACTS.storeKey,
}

export class ContactInformation extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = (queue) => {
    this.props.onUpdate(this.storeKey, {
      HomeEmail: this.props.HomeEmail,
      WorkEmail: this.props.WorkEmail,
      PhoneNumbers: this.props.PhoneNumbers,
      ...queue,
    })
  }

  updateHomeEmail = (values) => {
    this.update({
      HomeEmail: values,
    })
  }

  updateWorkEmail = (values) => {
    this.update({
      WorkEmail: values,
    })
  }

  updatePhoneNumbers = (values) => {
    this.update({
      PhoneNumbers: values,
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  phoneNumberSummary = (item, index) => {
    const number = TelephoneSummary((item.Item || {}).Telephone)
    return Summary({
      type: i18n.t('identification.contacts.collection.summary.phoneNumber'),
      index,
      left: number,
      right: null,
      placeholder: i18n.t('identification.contacts.collection.summary.unknownPhone'),
    })
  }

  firstItemRequired = (item, index, initial, callback) => {
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
    const { HomeEmail = {}, WorkEmail = {}, isReview } = this.props
    const klass = `${this.props.className || ''}`.trim()
    const phoneNumbers = this.props.PhoneNumbers

    if (this.props.shouldFilterEmptyItems) {
      let filtered = phoneNumbers.items.length
      const filteredPhoneNumbers = phoneNumbers.items.filter((x) => {
        const item = x.Item || {}
        if (!item.Telephone || !item.Telephone.value) {
          filtered -= 1
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
        data-section={IDENTIFICATION.key}
        data-subsection={IDENTIFICATION_CONTACTS.key}
      >
        <h1 className="section-header">{i18n.t('identification.destination.contacts')}</h1>

        <Field
          title={i18n.t('identification.contacts.heading.email')}
          titleSize="h3"
          help="identification.contacts.help.email"
          optional={true}
          className="no-margin-bottom"
          scrollIntoView={false}
        >
          {i18n.m('identification.contacts.para.email')}
        </Field>

        <Field
          title={i18n.t('identification.contacts.heading.emailHome')}
          titleSize="h4"
          optional={!!WorkEmail.value}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Email
            name="HomeEmail"
            className="email-home"
            {...HomeEmail}
            onUpdate={this.updateHomeEmail}
            onError={this.props.onError}
            required={isReview && !WorkEmail.value}
          />
        </Field>
        <Field
          title={i18n.t('identification.contacts.heading.emailWork')}
          titleSize="h4"
          optional={!!HomeEmail.value}
          scrollIntoView={this.props.scrollIntoView}
        >
          <Email
            name="WorkEmail"
            className="email-work"
            {...WorkEmail}
            onUpdate={this.updateWorkEmail}
            onError={this.props.onError}
            required={isReview && !HomeEmail.value}
          />
        </Field>

        <Field
          title={i18n.t('identification.contacts.heading.phoneNumber')}
          titleSize="h3"
          optional={true}
          help="identification.contacts.help.phoneNumber"
          className="no-margin-bottom"
          scrollIntoView={false}
        >
          {i18n.m('identification.contacts.para.phoneNumber')}
        </Field>

        <Field
          errors={[{ code: 'validPhoneTypes', valid: this.uniquePhoneTypes() }]}
          className={this.uniquePhoneTypes() && 'hidden'}
        />

        <div className={`${klass} telephone-collection`}>
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
            description={i18n.t('identification.contacts.collection.phoneNumbers.summary.title')}
            appendLabel={i18n.t('identification.contacts.collection.phoneNumbers.append')}
            scrollIntoView={this.props.scrollIntoView}
          >
            <AccordionItem
              scrollIntoView={this.props.scrollIntoView}
              required={this.props.required}
            >
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
  onUpdate: () => {},
  onError: (value, arr) => arr,
  dispatch: () => {},
  validator: data => (
    new IdentificationContactInformationValidator(data).isValid()
  ),
  defaultState: true,
  isReview: false,
}

export default connectSubsection(ContactInformation, sectionConfig)
