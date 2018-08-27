import DateRangeValidator from './daterange'
import { validGenericTextfield, validNotApplicable } from './helpers'

export default class SentenceValidator {
  constructor(data = {}) {
    this.description = data.Description
    this.exceedsYear = (data.ExceedsYear || {}).value
    this.incarcerated = (data.Incarcerated || {}).value
    this.incarcerationDates = data.IncarcerationDates
    this.incarcerationDatesNA = data.IncarcerationDatesNA
    this.probationDates = data.ProbationDates
    this.probationDatesNA = data.ProbationDatesNA
  }

  validChecks() {
    if (this.exceedsYear !== 'Yes' && this.exceedsYear !== 'No') {
      return false
    }
    if (this.incarcerated !== 'Yes' && this.incarcerated !== 'No') {
      return false
    }
    return true
  }

  validIncarcerationDates() {
    return validNotApplicable(this.incarcerationDatesNA, () => {
      return new DateRangeValidator(this.incarcerationDates).isValid()
    })
  }

  validProbationDates() {
    return validNotApplicable(this.probationDatesNA, () => {
      return new DateRangeValidator(this.probationDates).isValid()
    })
  }

  validDescription() {
    return validGenericTextfield(this.description)
  }

  isValid() {
    return (
      this.validChecks() &&
      this.validDescription() &&
      this.validIncarcerationDates() &&
      this.validProbationDates()
    )
  }
}
