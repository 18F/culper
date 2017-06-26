import AddressValidator from './address'
import NameValidator from './name'
import LocationValidator from './location'
import { validDateField, validPhoneNumber } from './helpers'

export default class DivorceValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.birthdate = state.Birthdate
    this.birthplace = state.BirthPlace
    this.telephone = state.Telephone
    this.recognized = state.Recognized
    this.address = state.Address
    this.dateDivorced = state.DateDivorced
    this.status = state.Status
    this.deceased = state.Deceased
    this.deceasedAddress = state.DeceasedAddress
  }

  validStatus () {
    return ['Divorced', 'Widowed', 'Annulled'].includes(this.status)
  }

  validDeceased () {
    if (this.status === 'Widowed') {
      return true
    }
    if (!['Yes', 'No', 'DK'].includes(this.deceased)) {
      return false
    }
    if (this.deceased === 'Yes') {
      return new AddressValidator(this.deceasedAddress).isValid()
    }
    return true
  }

  isValid () {
    return new NameValidator(this.name).isValid() &&
      validDateField(this.birthdate) &&
      new LocationValidator(this.birthplace).isValid() &&
      validPhoneNumber(this.telephone) &&
      validDateField(this.recognized) &&
      new AddressValidator(this.address).isValid() &&
      validDateField(this.dateDivorced) &&
      this.validStatus() &&
      this.validDeceased()
  }
}
