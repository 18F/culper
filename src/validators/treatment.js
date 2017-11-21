import LocationValidator from './location'
import { validGenericTextfield, validPhoneNumber } from './helpers'

export default class TreatmentValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.phone = state.Phone
    this.address = state.Address
  }

  isValid () {
    return validGenericTextfield(this.name) &&
      validPhoneNumber(this.phone) &&
      new LocationValidator(this.address).isValid()
  }
}
