import { validAccordion, validGenericTextfield, validPhoneNumber } from './helpers'

export default class ContactInformationValidator {
  constructor (data, props) {
    this.emails = data.Emails || {}
    this.phoneNumbers = data.PhoneNumbers || {}
  }

  /**
   * Validates a collection of emails
   */
  validEmails () {
    const required = 2
    let successful = 0

    const valid = validAccordion(this.emails, (item) => {
      successful++
      return new ContactEmailValidator(item.Email).isValid()
    }, true)

    return valid && successful >= required
  }

  /**
   * Validates a collection of phone numbers
   */
  validPhoneNumbers () {
    const required = 1
    let successful = 0

    const valid = validAccordion(this.phoneNumbers, (item) => {
      successful++
      return new ContactPhoneNumberValidator(item.PhoneNumber).isValid()
    }, true)

    return valid && successful >= required
  }

  /**
   * Validates emails and phone numbers
   */
  isValid () {
    return this.validEmails() && this.validPhoneNumbers()
  }
}

export class ContactEmailValidator {
  constructor (data) {
    this.email = data
  }

  isValid () {
    return validGenericTextfield(this.email)
  }
}

export class ContactPhoneNumberValidator {
  constructor (data) {
    this.phoneNumber = data
  }

  isValid () {
    return validPhoneNumber(this.phoneNumber)
  }
}
