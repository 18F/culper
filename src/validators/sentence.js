import DateRangeValidator from './daterange'
import { validGenericTextfield } from './helpers'

export default class SentenceValidator {
  constructor (state = {}, props = {}) {
    this.description = state.Description
    this.exceedsYear = state.ExceedsYear
    this.incarcerated = state.Incarcerated
    this.incarcerationDates = state.IncarcerationDates
    this.probationDates = state.ProbationDates
  }

  validChecks () {
    if (this.exceedsYear !== 'Yes' && this.exceedsYear !== 'No') {
      return false
    }
    if (this.incarcerated !== 'Yes' && this.incarcerated !== 'No') {
      return false
    }
    return true
  }

  validIncarcerationDates () {
    if (!this.incarcerationDates) {
      return true
    }
    return new DateRangeValidator(this.incarcerationDates).isValid()
  }

  validProbationDates () {
    if (!this.probationDates) {
      return true
    }
    return new DateRangeValidator(this.probationDates).isValid()
  }

  validDescription () {
    return validGenericTextfield(this.description)
  }

  isValid () {
    return this.validChecks() &&
      this.validDescription() &&
      this.validIncarcerationDates() &&
      this.validProbationDates()
  }
}
