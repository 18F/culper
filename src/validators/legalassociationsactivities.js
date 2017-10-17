import DateRangeValidator from './daterange'
import { validGenericTextfield } from './helpers'

export default class LegalAssociationActivitiesValidator {
  constructor (data = {}) {
    this.hasActivities = (data.HasActivities || {}).value
    this.list = data.List || []
    this.listBranch = data.ListBranch
  }

  validList () {
    if (this.hasActivities === 'No') {
      return true
    }

    if (this.hasActivities === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new ActivitiesValidator(item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class ActivitiesValidator {
  constructor (data = {}) {
    this.reasons = data.Reasons
    this.dates = data.Dates
  }

  validReasons () {
    return !!this.reasons && validGenericTextfield(this.reasons)
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  isValid () {
    return this.validReasons() &&
      this.validDates()
  }
}
