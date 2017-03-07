export default class ContactInformationValidator {
  constructor (state, props) {
    this.emails = state.Emails
    this.phoneNumbers = state.PhoneNumbers
  }

  /**
   * Validates a collection of emails
   */
  validEmails () {
    if (!this.emails || this.emails.length < 2) {
      return false
    }

    for (let item of this.emails) {
      if (!item.Email || !item.Email.value) {
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

    for (let item of this.phoneNumbers) {
      if (!item.Telephone || !item.Telephone.value) {
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
