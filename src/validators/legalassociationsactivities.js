import DateRangeValidator from './daterange'
import { validGenericTextfield } from './helpers'

export default class LegalAssociationActivitiesValidator {
  constructor (state = {}, props = {}) {
    this.hasActivities = props.HasActivities
    this.list = props.List || []
    this.listBranch = props.ListBranch
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

      return this.list.every(item => new ActivitiesValidator(null, item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class ActivitiesValidator {
  constructor (state = {}, props = {}) {
    this.reasons = props.Reasons
    this.dates = props.Dates
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
