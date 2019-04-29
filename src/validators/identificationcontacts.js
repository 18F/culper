import { validGenericTextfield, validPhoneNumber } from './helpers'

export default class IdentificationContactInformationValidator {
  constructor(data = {}) {
    this.homeEmail = data.HomeEmail
    this.workEmail = data.WorkEmail
    this.phoneNumbers = (data.PhoneNumbers || { items: [] }).items
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
   * This function does not check for the validity of an email, but
   * rather it checks for the prescence of a required email.
   */
  validEmailPresent() {
    if (
      (this.homeEmail && this.homeEmail.value)
      || (this.workEmail && this.workEmail.value)
    ) {
      return true
    }
    return false
  }

  /**
   * Validates emails and phone numbers
   */
  isValid() {
    return this.validPhoneNumbers()
    && this.validPhoneTypes()
    && this.validEmailPresent()
  }
}

export class ContactPhoneNumberValidator {
  constructor(data = {}) {
    this.phoneNumber = data.Telephone
  }

  isValid() {
    return validPhoneNumber(this.phoneNumber, { numberType: true })
  }
}
