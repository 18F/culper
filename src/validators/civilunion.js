import LocationValidator from './location'
import NameValidator from './name'
import DateRangeValidator from './daterange'
import ForeignBornDocument from './foreignborndocument'
import { validBranch, validSSN, validDateField, validPhoneNumber, BranchCollection } from './helpers'

export default class CivilUnionValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.birthdate = state.Birthdate
    this.birthPlace = state.BirthPlace
    this.foreignBornDocument = state.ForeignBornDocument
    this.ssn = state.SSN
    this.otherNames = state.OtherNames
    this.datesUsed = state.DatesUsed
    this.citizenship = state.Citizenship
    this.location = state.Location
    this.address = state.Address
    this.telephone = state.Telephone
    this.separated = (state.Separated || {}).value
    this.dateSeparated = state.DateSeparated
    this.addressSeparated = state.AddressSeparated
    this.addressSeparatedNotApplicable = state.AddressSeparatedNotApplicable
    this.divorced = (state.Divorced || {}).value
  }

  validCitizenship () {
    return !!this.citizenship && !!this.citizenship.value && this.citizenship.value.length > 0
  }

  validOtherName () {
    const branchValidator = new BranchCollection(this.otherNames)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (!branchValidator.hasNo()) {
      return false
    }

    return branchValidator.each(item => {
      return new NameValidator(item.Othername).isValid() &&
        new DateRangeValidator(item.DatesUsed) &&
        validBranch((item.MaidenName || {}).value)
    })
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
      addressValid = new LocationValidator(this.addressSeparated).isValid()
    }

    return validDateField(this.dateSeparated) && addressValid
  }

  validForeignBornDocument () {
    if (new LocationValidator(this.birthPlace).isValid() && this.birthPlace.country !== 'United States') {
      return new ForeignBornDocument(this.foreignBornDocument).isValid()
    }
    return true
  }

  validAddress () {
    const address = this.address || {}
    // This one is optional so if a user fills anything, then assume they want to fill it all out
    const fields = [address.street, address.street2, address.city, address.state, address.zipcode]
    if (fields.some(field => !!field)) {
      return new LocationValidator(this.address).isValid()
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
      this.validAddress() &&
      new LocationValidator(this.location).isValid() &&
      this.validSeparated() &&
      this.validCitizenship() &&
      !!this.divorced
  }
}
