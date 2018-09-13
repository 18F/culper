import { validGenericTextfield, validPhoneNumber } from './helpers'

export default class IdentificationContactInformationValidator {
  constructor(data = {}) {
    this.emails = (data.Emails || { items: [] }).items
    this.phoneNumbers = (data.PhoneNumbers || { items: [] }).items
  }

  /**
   * Validates a collection of emails
   */
  validEmails() {
    const required = 0
    if (!this.emails || this.emails.length < required) {
      return false
    }

    let successful = 0
    for (const email of this.emails) {
      if (!new ContactEmailValidator(email.Item).isValid()) {
        continue
      }
      successful++
    }

    return successful >= required
  }

  /**
   * Validates a collection of phone numbers
   */
  validPhoneNumbers() {
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

  validPhoneTypes() {
    let types = []
    for (const phoneNumber of this.phoneNumbers) {
      if (!phoneNumber || !phoneNumber.Item || !phoneNumber.Item.Telephone) {
        continue
      }
      types.push(phoneNumber.Item.Telephone.numberType)
    }

    const uniqueTypes = [...new Set(types)]
    return uniqueTypes.length === types.length
  }

  /**
   * Validates emails and phone numbers
   */
  isValid() {
    return (
      this.validEmails() && this.validPhoneNumbers() && this.validPhoneTypes()
    )
  }
}

export class ContactEmailValidator {
  constructor(data = {}) {
    this.email = data.Email
  }

  isValid() {
    return validGenericTextfield(this.email)
  }
}

export class ContactPhoneNumberValidator {
  constructor(data = {}) {
    this.phoneNumber = data.Telephone
  }

  isValid() {
    return validPhoneNumber(this.phoneNumber)
  }
}
