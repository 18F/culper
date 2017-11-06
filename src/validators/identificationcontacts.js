import { validGenericTextfield, validPhoneNumber } from './helpers'

export default class IdentificationContactInformationValidator {
  constructor (data = {}) {
    this.emails = data.Emails || []
    this.phoneNumbers = data.PhoneNumbers || []
  }

  /**
   * Validates a collection of emails
   */
  validEmails () {
    const required = 2
    if (!this.emails || this.emails.length < required) {
      return false
    }

    for (const email of this.emails) {
      if (!new ContactEmailValidator(email.Item).isValid()) {
        return false
      }
    }

    return true
  }

  /**
   * Validates a collection of phone numbers
   */
  validPhoneNumbers () {
    const required = 1
    if (!this.phoneNumbers || this.phoneNumbers.length < required) {
      return false
    }

    let successful = 0
    for (const phoneNumber of this.phoneNumbers) {
      if (!new ContactPhoneNumberValidator(phoneNumber.Item).isValid()) {
        continue
      }
      successful++
    }

    return successful >= required
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
