import DateRangeValidator from './daterange'
import { validAccordion, validGenericTextfield } from './helpers'

export default class LegalAssociationEngagedValidator {
  constructor(data = {}) {
    this.hasEngaged = (data.HasEngaged || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasEngaged === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new EngagedValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class EngagedValidator {
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
