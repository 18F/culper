import DateRangeValidator from './daterange'
import { validGenericTextfield } from './helpers'

export default class ForeignBusinessPoliticalValidator {
  constructor (data = {}) {
    this.hasForeignPolitical = (data.HasForeignPolitical || {}).value
    this.list = data.List || []
    this.listBranch = data.ListBranch
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

      return this.list.every(item => new PoliticalValidator(item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class PoliticalValidator {
  constructor (data = {}) {
    this.position = data.Position
    this.dates = data.Dates
    this.country = data.Country
    this.reason = data.Reason
    this.eligibility = data.Eligibility
  }

  validPosition () {
    return !!this.position && validGenericTextfield(this.position)
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  validCountry () {
    return validGenericTextfield(this.country)
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
