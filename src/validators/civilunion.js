import AddressValidator from './address'
import NameValidator from './name'
import LocationValidator from './location'
import DateRangeValidator from './daterange'
import ForeignBornDocument from './foreignborndocument'
import { validBranch, validSSN, validDateField, validPhoneNumber } from './helpers'

export default class CivilUnionValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.birthdate = state.Birthdate
    this.birthPlace = state.BirthPlace
    this.foreignBornDocument = state.ForeignBornDocument
    this.ssn = state.SSN
    this.otherName = state.OtherName
    this.otherNameMaiden = state.OtherNameMaiden
    this.otherNameNotApplicable = state.OtherNameNotApplicable
    this.datesUsed = state.DatesUsed
    this.citizenship = state.Citizenship
    this.address = state.Address
    this.telephone = state.Telephone
    this.separated = state.Separated
    this.dateSeparated = state.DateSeparated
    this.addressSeparated = state.AddressSeparated
    this.addressSeparatedNotApplicable = state.AddressSeparatedNotApplicable
    this.divorced = state.Divorced
  }

  validCitizenship () {
    return !!this.citizenship && !!this.citizenship.value && this.citizenship.value.length > 0
  }

  validOtherName () {
    if (this.otherNameNotApplicable) {
      return true
    }
    return new NameValidator(this.otherName).isValid() &&
      new DateRangeValidator(this.datesUsed).isValid()
  }

  validSeparated () {
    if (!validBranch(this.separated)) {
      return false
    }

    if (this.separated === 'No') {
      return true
    }

    let addressValid = true
    if (!this.addressSeparatedNotApplicable) {
      addressValid = new AddressValidator(this.addressSeparated).isValid()
    }

    return validDateField(this.dateSeparated) && addressValid
  }

  validForeignBornDocument () {
    if (new LocationValidator(this.birthPlace).isValid() && this.birthPlace.country !== 'United States') {
      return new ForeignBornDocument(this.foreignBornDocument).isValid()
    }
    return true
  }

  isValid () {
    return new NameValidator(this.name).isValid() &&
      validDateField(this.birthdate) &&
      new LocationValidator(this.birthPlace).isValid() &&
      this.validForeignBornDocument() &&
      validPhoneNumber(this.telephone) &&
      validSSN(this.ssn) &&
      validBranch(this.separated) &&
      new AddressValidator(this.address).isValid() &&
      this.validSeparated() &&
      this.validCitizenship() &&
      !!this.divorced
  }
}
