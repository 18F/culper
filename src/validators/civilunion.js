import AddressValidator from './address'
import NameValidator from './name'
import BirthPlaceValidator from './birthplace'
import DateRangeValidator from './daterange'
import DivorceValidator from './divorce'
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
    this.address = state.Address
    this.telephone = state.Telephone
    this.separated = state.Separated
    this.dateSeparated = state.DateSeparated
    this.addressSeparated = state.AddressSeparated
    this.addressSeparatedNotApplicable = state.AddressSeparatedNotApplicable
    this.divorced = state.Divorced
    this.divorcedList = state.DivorcedList
    this.divorcedListBranch = state.DivorcedListBranch
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

  validDivorced () {
    if (!validBranch(this.divorced)) {
      return false
    }

    if (this.divorced === 'No') {
      return true
    }

    if (!this.divorcedList || !this.divorcedList.length) {
      return false
    }

    if (this.divorcedListBranch !== 'No') {
      return false
    }

    for (let item of this.divorcedList) {
      if (!new DivorceValidator(item.Divorce).isValid()) {
        return false
      }
    }

    return true
  }

  validForeignBornDocument () {
    if (new BirthPlaceValidator(this.birthPlace).isValid() && this.birthPlace.country !== 'United States') {
      return new ForeignBornDocument(this.foreignBornDocument).isValid()
    }
    return true
  }

  isValid () {
    return new NameValidator(this.name).isValid() &&
      validDateField(this.birthdate) &&
      new BirthPlaceValidator(this.birthPlace).isValid() &&
      this.validForeignBornDocument() &&
      validPhoneNumber(this.telephone) &&
      validSSN(this.ssn) &&
      validBranch(this.separated) &&
      new AddressValidator(this.address).isValid() &&
      this.validSeparated() &&
      this.validDivorced()
  }
}
