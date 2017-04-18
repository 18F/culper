import NameValidator from './name'
import BirthPlaceValidator from './birthplace'
import DateRangeValidator from './daterange'
import ForeignBornDocument from './foreignborndocument'
import { validSSN, validDateField } from './helpers'

export default class CohabitantValidator {
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
      new ForeignBornDocument(this.foreignBornDocument).isValid() &&
      validSSN(this.ssn)
  }
}
