import DateRangeValidator from './daterange'
import { validAccordion, validGenericTextfield } from './helpers'

export default class LegalAssociationAdvocatingValidator {
  constructor(data = {}) {
    this.hasAdvocated = (data.HasAdvocated || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasAdvocated === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new AdvocatingValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class AdvocatingValidator {
  constructor(data = {}) {
    this.reasons = data.Reasons
    this.dates = data.Dates
  }

  validReasons() {
    return !!this.reasons && validGenericTextfield(this.reasons)
  }

  validDates() {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  isValid() {
    return this.validReasons() && this.validDates()
  }
}
