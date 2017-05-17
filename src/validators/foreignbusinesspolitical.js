import DateRangeValidator from './daterange'
import { validGenericTextfield, validDateField, validNotApplicable } from './helpers'

export default class ForeignBusinessPoliticalValidator {
  constructor (state = {}, props = {}) {
    this.hasForeignPolitical = props.HasForeignPolitical
    this.list = props.List || []
    this.listBranch = props.ListBranch
  }

  validList () {
    if (this.hasForeignPolitical === 'No') {
      return true
    }

    if (this.hasForeignPolitical === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new PoliticalValidator(null, item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class PoliticalValidator {
  constructor (state = {}, props = {}) {
    this.position = props.Position
    this.dates = props.Dates
    this.country = props.Country
    this.reason = props.Reason
    this.eligibility = props.Eligibility
  }

  validPosition () {
    return !!this.position && validGenericTextfield(this.position)
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  validCountry () {
    return !!this.country && !!this.country.value
  }

  validReason () {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validEligibility () {
    return !!this.eligibility && validGenericTextfield(this.eligibility)
  }

  isValid () {
    return this.validPosition() &&
      this.validDates() &&
      this.validCountry() &&
      this.validReason() &&
      this.validEligibility()
  }
}
