import NameValidator from './name'
import LocationValidator from './location'
import DateRangeValidator from './daterange'
import ForeignBornDocument from './foreignborndocument'
import { validSSN, validDateField, validBranch, BranchCollection } from './helpers'

export default class CohabitantsValidator {
  constructor (state = {}) {
    this.hasCohabitant = state.HasCohabitant
    this.cohabitantList = state.CohabitantList || []
    this.cohabitantListBranch = state.CohabitantListBranch
  }

  isValid () {
    if (!validBranch(this.hasCohabitant)) {
      return false
    }
    if (this.hasCohabitant === 'No') {
      return true
    }

    if (!this.cohabitantList.length) {
      return false
    }

    if (this.cohabitantListBranch !== 'No') {
      return false
    }

    for (let item of this.cohabitantList) {
      if (!new CohabitantValidator(item.Item).isValid()) {
        return false
      }
    }
    return true
  }
}

export class CohabitantValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.birthdate = state.Birthdate
    this.birthPlace = state.BirthPlace
    this.foreignBornDocument = state.ForeignBornDocument
    this.ssn = state.SSN
    this.otherNames = state.OtherNames
    this.citizenship = state.Citizenship
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
    if (new LocationValidator(this.birthPlace).isValid() && this.birthPlace.country !== 'United States') {
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

    return branchValidator.each(item => {
      return new NameValidator(item.Othername).isValid() &&
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
