import AddressValidator from './address'
import NameValidator from './name'
import BirthPlaceValidator from './birthplace'
import { validGenericTextfield, validDateField, validPhoneNumber } from './helpers'

export default class CivilUnion {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.birthdate = state.Birthdate
    this.birthplace = state.BirthPlace
    this.foreignBornDocument = state.ForeignBornDocument
    this.ssn = state.SSN
    this.otherName = state.OtherName
    this.otherNameMaiden = state.OtherNameMaiden
    this.datesUsed = state.DatesUsed
    this.telephone = state.Telephone
    this.separated = state.Separated
    this.dateSeparated = state.DateSeparated
    this.addressSeparated = state.AddressSeparated
  }

  validStatus () {
    return ['Divorced', 'Widowed', 'Annulled'].includes(this.status)
  }

  isValid () {
    return new NameValidator(this.name).isValid() &&
      validDateField(this.birthdate) &&
      new BirthPlaceValidator(this.birthplace).isValid() &&
      // validate foreignBornDocument
      validPhoneNumber(this.telephone) &&

      new AddressValidator(this.address).isValid() &&
      validDateField(this.dateDivorced) &&
      this.validStatus() &&
      this.validDeceased()
  }
}
