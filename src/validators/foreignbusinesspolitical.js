import DateRangeValidator from './daterange'
import { validAccordion, validGenericTextfield } from './helpers'

export default class ForeignBusinessPoliticalValidator {
  constructor(data = {}) {
    this.hasForeignPolitical = (data.HasForeignPolitical || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasForeignPolitical === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new PoliticalValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class PoliticalValidator {
  constructor(data = {}) {
    this.position = data.Position
    this.dates = data.Dates
    this.country = data.Country
    this.reason = data.Reason
    this.eligibility = data.Eligibility
  }

  validPosition() {
    return !!this.position && validGenericTextfield(this.position)
  }

  validDates() {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  validCountry() {
    return validGenericTextfield(this.country)
  }

  validReason() {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validEligibility() {
    return !!this.eligibility && validGenericTextfield(this.eligibility)
  }

  isValid() {
    return (
      this.validPosition() &&
      this.validDates() &&
      this.validCountry() &&
      this.validReason() &&
      this.validEligibility()
    )
  }
}
