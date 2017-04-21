import NameValidator from './name'
import BirthPlaceValidator from './birthplace'
import DateRangeValidator from './daterange'
import ForeignBornDocument from './foreignborndocument'
import { validSSN, validDateField, validBranch } from './helpers'

export default class CohabitantsValidator {
  constructor (state = {}) {
    this.hasCohabitant = state.HasCohabitant
    this.cohabitantList = state.CohabitantList || []
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

    for (let item of this.cohabitantList) {
      if (!new CohabitantValidator(item.Cohabitant).isValid()) {
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
    this.otherName = state.OtherName
    this.otherNameMaiden = state.OtherNameMaiden
    this.otherNameNotApplicable = state.OtherNameNotApplicable
    this.otherNameUsed = state.OtherNameUsed
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
    if (new BirthPlaceValidator(this.birthPlace).isValid() && this.birthPlace.country !== 'United States') {
      return new ForeignBornDocument(this.foreignBornDocument).isValid()
    }
    return true
  }

  validOtherName () {
    if (this.otherNameNotApplicable) {
      return true
    }
    return new NameValidator(this.otherName).isValid() &&
      new DateRangeValidator(this.otherNameUsed).isValid()
  }

  isValid () {
    return new NameValidator(this.name).isValid() &&
      validDateField(this.birthdate) &&
      new BirthPlaceValidator(this.birthPlace).isValid() &&
      this.validForeignBornDocument() &&
      validSSN(this.ssn)
  }
}
