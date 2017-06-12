import DateRangeValidator from './daterange'
import { validGenericTextfield, validNotApplicable } from './helpers'

export default class SentenceValidator {
  constructor (state = {}, props = {}) {
    this.description = state.Description
    this.exceedsYear = state.ExceedsYear
    this.incarcerated = state.Incarcerated
    this.incarcerationDates = state.IncarcerationDates
    this.incarcerationDatesNA = state.IncarcerationDatesNA
    this.probationDates = state.ProbationDates
    this.probationDatesNA = state.ProbationDatesNA
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
    return validNotApplicable(this.incarcerationDatesNA, () => {
      return new DateRangeValidator(this.incarcerationDates).isValid()
    })
  }

  validProbationDates () {
    return validNotApplicable(this.probationDatesNA, () => {
      return new DateRangeValidator(this.probationDates).isValid()
    })
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
