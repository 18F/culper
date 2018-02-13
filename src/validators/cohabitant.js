import NameValidator from './name'
import LocationValidator, { countryString } from './location'
import DateRangeValidator from './daterange'
import ForeignBornDocument from './foreignborndocument'
import { validAccordion, validSSN, validDateField, validBranch, BranchCollection } from './helpers'

export default class CohabitantsValidator {
  constructor (data = {}) {
    this.hasCohabitant = (data.HasCohabitant || {}).value
    this.list = data.CohabitantList || {}
  }

  isValid () {
    if (!validBranch(this.hasCohabitant)) {
      return false
    }

    if (this.hasCohabitant === 'No') {
      return true
    }

    return validAccordion(this.list, (item) => {
      return new CohabitantValidator(item).isValid()
    })
  }
}

export class CohabitantValidator {
  constructor (data = {}) {
    this.name = data.Name
    this.birthdate = data.Birthdate
    this.birthPlace = data.BirthPlace || {}
    this.foreignBornDocument = data.ForeignBornDocument
    this.ssn = data.SSN
    this.otherNames = data.OtherNames
    this.citizenship = data.Citizenship
  }

  similarSpouse (spouse) {
    if (!this.name || !spouse) {
      return false
    }

    if (this.name.first === spouse.first && this.name.last === spouse.last && this.name.middle === spouse.middle) {
      return true
    }

    return false
  }

  validForeignBornDocument () {
    const country = countryString(this.birthPlace.country)
    if (new LocationValidator(this.birthPlace).isValid() && country !== 'United States') {
      return new ForeignBornDocument(this.foreignBornDocument).isValid()
    }
    return true
  }

  validOtherNames () {
    const branchValidator = new BranchCollection(this.otherNames)
    if (!branchValidator.validKeyValues()) {
      return false
    }

    if (!branchValidator.hasNo()) {
      return false
    }

    return branchValidator.each(row => {
      const item = row.Item || {}
      return new NameValidator(item.OtherName).isValid() &&
        new DateRangeValidator(item.DatesUsed) &&
        validBranch((item.MaidenName || {}).value)
    })
  }

  validCitizenship () {
    return !!this.citizenship && !!this.citizenship.value && this.citizenship.value.length > 0
  }

  isValid () {
    return new NameValidator(this.name).isValid() &&
      validDateField(this.birthdate) &&
      new LocationValidator(this.birthPlace).isValid() &&
      this.validForeignBornDocument() &&
      validSSN(this.ssn) &&
      this.validCitizenship() &&
      this.validOtherNames()
  }
}
