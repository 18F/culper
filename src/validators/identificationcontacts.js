import { validGenericTextfield, validPhoneNumber } from './helpers'

export default class IdentificationContactInformationValidator {
  constructor(data = {}) {
    this.homeEmail = data.HomeEmail
    this.workEmail = data.WorkEmail
    this.phoneNumbers = (data.PhoneNumbers || { items: [] }).items
  }

  /**
   * Validates a collection of emails
   */
  validEmails() {
    console.log(this.homeEmail)
    console.log(this.workEmail)
    return (
      validGenericTextfield(this.homeEmail) &&
      validGenericTextfield(this.workEmail)
    )
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
    console.log(this.validEmails())
    return (
      this.validEmails() && this.validPhoneNumbers() && this.validPhoneTypes()
    )
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
