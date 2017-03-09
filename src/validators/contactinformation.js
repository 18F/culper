import { validGenericTextfield, validPhoneNumber } from './helpers'

export default class ContactInformationValidator {
  constructor (state, props) {
    this.emails = state.Emails
    this.phoneNumbers = state.PhoneNumbers
  }

  /**
   * Validates a collection of emails
   */
  validEmails () {
    if (!this.emails || this.emails.length < 1) {
      return false
    }

    for (const item of this.emails) {
      if (!item.Email || !validGenericTextfield(item.Email)) {
        return false
      }
    }

    return true
  }

  /**
   * Validates a collection of phone numbers
   */
  validPhoneNumbers () {
    if (!this.phoneNumbers || this.phoneNumbers.length < 2) {
      return false
    }

    for (const item of this.phoneNumbers) {
      if (!item.Telephone || !validPhoneNumber(item.Telephone)) {
        return false
      }
    }

    return true
  }

  /**
   * Validates emails and phone numbers
   */
  isValid () {
    return this.validEmails() && this.validPhoneNumbers()
  }
}
