import LocationValidator, { countryString } from './location'
import NameValidator from './name'
import DateRangeValidator from './daterange'
import ForeignBornDocument from './foreignborndocument'
import {
  validBranch,
  validSSN,
  validDateField,
  validPhoneNumber,
  BranchCollection
} from './helpers'

export default class CivilUnionValidator {
  constructor(data = {}) {
    this.name = data.Name
    this.birthdate = data.Birthdate
    this.birthPlace = data.BirthPlace
    this.foreignBornDocument = data.ForeignBornDocument
    this.ssn = data.SSN
    this.otherNames = data.OtherNames
    this.datesUsed = data.DatesUsed
    this.citizenship = data.Citizenship
    this.location = data.Location
    this.address = data.Address
    this.telephone = data.Telephone
    this.separated = (data.Separated || {}).value
    this.dateSeparated = data.DateSeparated
    this.addressSeparated = data.AddressSeparated
    this.addressSeparatedNotApplicable = data.AddressSeparatedNotApplicable
    this.divorced = (data.Divorced || {}).value
  }

  validCitizenship() {
    return (
      !!this.citizenship &&
      !!this.citizenship.value &&
      this.citizenship.value.length > 0
    )
  }

  validOtherName() {
    const branchValidator = new BranchCollection(this.otherNames)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (!branchValidator.hasNo()) {
      return false
    }

    return branchValidator.each(item => {
      return (
        new NameValidator(item.Othername).isValid() &&
        new DateRangeValidator(item.DatesUsed) &&
        validBranch((item.MaidenName || {}).value)
      )
    })
  }

  validSeparated() {
    if (!validBranch(this.separated)) {
      return false
    }

    if (this.separated === 'No') {
      return true
    }

    let addressValid = true
    if (this.addressSeparatedNotApplicable.applicable) {
      addressValid = new LocationValidator(this.addressSeparated).isValid()
    }

    return validDateField(this.dateSeparated) && addressValid
  }

  validForeignBornDocument() {
    if (
      new LocationValidator(this.birthPlace).isValid() &&
      countryString(this.birthPlace.country) !== 'United States'
    ) {
      return new ForeignBornDocument(this.foreignBornDocument).isValid()
    }
    return true
  }

  validAddress() {
    const address = this.address || {}
    // This one is optional so if a user fills anything, then assume they want to fill it all out
    const fields = [
      address.street,
      address.street2,
      address.city,
      address.state,
      address.zipcode
    ]
    if (fields.some(field => !!field)) {
      return new LocationValidator(this.address).isValid()
    }
    return true
  }

  isValid() {
    return (
      new NameValidator(this.name).isValid() &&
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
    )
  }
}
