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
    const required = 1
    if (!this.emails || this.emails.length < required) {
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
    const required = 1
    if (!this.phoneNumbers || this.phoneNumbers.length < required) {
      return false
    }

    let successful = 0
    for (const item of this.phoneNumbers) {
      if (!item.Telephone || !validPhoneNumber(item.Telephone)) {
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
