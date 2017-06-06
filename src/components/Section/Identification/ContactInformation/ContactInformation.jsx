import React from 'react'
import { i18n } from '../../../../config'
import { ContactInformationValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Field, Email, Accordion, Telephone } from '../../../Form'

export default class ContactInformation extends SubsectionElement {
  constructor (props) {
    super(props)

    this.state = {
      Emails: props.Emails || [],
      PhoneNumbers: props.PhoneNumbers || []
    }
  }

  emailDispatch (collection) {
    this.handleUpdate('Emails', collection)
  }

  contactDispatch (field, values) {
    this.handleUpdate(field, values)
  }

  handleUpdate (field, values) {
    this.setState({ [field]: values.items }, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate({
          Emails: this.state.Emails,
          PhoneNumbers: this.state.PhoneNumbers
        })
      }
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  emailSummary (item, index) {
    let addr = i18n.t('identification.contacts.collection.summary.unknownEmail')
    if (item.Email && item.Email.value) {
      addr = item.Email.value
    }

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
    let number = i18n.t('identification.contacts.collection.summary.unknownPhone')
    if (item.Telephone && !item.noNumber && item.Telephone.number) {
      number = item.Telephone.number

      switch (item.Telephone.type) {
        case 'DSN':
          number = `${number.slice(0, 3)}-${number.slice(3, 7)}`
          break

        case 'International':
          number = `+${number.slice(0, 3)} ${number.slice(3, 13)}`
          if (item.Telephone.extension) {
            number += ` x${item.Telephone.extension}`
          }
          break

        case 'Domestic':
        default:
          number = `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 10)}`
          if (item.Telephone.extension) {
            number += ` x${item.Telephone.extension}`
          }
          break
      }
    }

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
          <Accordion minimum="2"
                     items={this.state.Emails}
                     defaultState={this.props.defaultState}
                     onUpdate={this.contactDispatch.bind(this, 'Emails')}
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
          <Accordion minimum="2"
                     items={this.state.PhoneNumbers}
                     defaultState={this.props.defaultState}
                     onUpdate={this.contactDispatch.bind(this, 'PhoneNumbers')}
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
  onError: (value, arr) => { return arr },
  section: 'identification',
  subsection: 'contacts',
  dispatch: () => {},
  validator: (state, props) => {
    return new ContactInformationValidator(state, props).isValid()
  },
  defaultState: true
}
