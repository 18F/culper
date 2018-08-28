import DateRangeValidator from './daterange'
import { validAccordion, validGenericTextfield } from './helpers'

export default class LegalAssociationActivitiesValidator {
  constructor(data = {}) {
    this.hasActivities = (data.HasActivities || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasActivities === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new ActivitiesValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class ActivitiesValidator {
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
