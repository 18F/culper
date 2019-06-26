import { validateModel } from 'models/validate'
import phone from 'models/shared/phone'
import email from 'models/shared/email'

// TODO - clean this up

export const validateContactEmail = data => (
  validateModel(data, email) === true
)

export const validateContactPhoneNumber = (data = {}) => {
  const { Telephone } = data
  return validateModel(Telephone, phone, { requireNumberType: true }) === true
}

// Requires at least one valid phone number item
export const validateContactPhoneNumbers = (data = []) => (
  data && data.length > 0
    && data.some(i => validateContactPhoneNumber(i.Item))
)

// There can only be one of each phone number type (Cell, Home, Work)
export const validateContactPhoneTypes = (data = []) => {
  const types = []

  data.forEach((i) => {
    if (!i.Item || !i.Item.Telephone) {
      return
    }

    types.push(i.Item.Telephone.numberType)
  })

  const uniqueTypes = [...new Set(types)]
  return uniqueTypes.length === types.length
}

// Checks for at least one valid phone number, valid home email, and valid work email
export const validateIdentificationContactInformation = (data = {}) => {
  const { HomeEmail, WorkEmail, PhoneNumbers = { items: [] } } = data

  const validEmailPresent = (HomeEmail && validateContactEmail(HomeEmail))
    || (WorkEmail && validateContactEmail(WorkEmail))

  return validateContactPhoneNumbers(PhoneNumbers.items)
    && validateContactPhoneTypes(PhoneNumbers.items)
    && validEmailPresent
}

/** LEGACY */
export default class IdentificationContactInformationValidator {
  constructor(data = {}) {
    this.data = data
    this.phoneNumbers = (data.PhoneNumbers || { items: [] }).items
  }

  validPhoneNumbers() {
    return validateContactPhoneNumbers(this.phoneNumbers)
  }

  validPhoneTypes() {
    return validateContactPhoneTypes(this.phoneNumbers)
  }

  /**
   * Validates emails and phone numbers
   */
  isValid() {
    return validateIdentificationContactInformation(this.data)
  }
}

export class ContactPhoneNumberValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateContactPhoneNumber(this.data)
  }
}
