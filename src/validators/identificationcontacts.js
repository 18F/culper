import { validateModel } from 'models/validate'
import identificationContactInfo, {
  contactPhoneNumber,
} from 'models/sections/identificationContactInfo'

export const validateContactPhoneNumber = data => (
  validateModel(data, contactPhoneNumber) === true
)

export const validateIdentificationContactInformation = data => (
  validateModel(data, identificationContactInfo) === true
)

/** LEGACY */
export default class IdentificationContactInformationValidator {
  constructor(data = {}) {
    this.data = data
  }

  validPhoneTypes() {
    return validateModel(this.data, {
      PhoneNumbers: identificationContactInfo.PhoneNumbers,
    }) === true
  }

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
