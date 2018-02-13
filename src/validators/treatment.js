import LocationValidator from './location'
import { validGenericTextfield, validPhoneNumber } from './helpers'

export default class TreatmentValidator {
  constructor (data = {}) {
    this.name = data.Name
    this.phone = data.Phone
    this.address = data.Address
  }

  isValid () {
    return validGenericTextfield(this.name) &&
      validPhoneNumber(this.phone) &&
      new LocationValidator(this.address).isValid()
  }
}
