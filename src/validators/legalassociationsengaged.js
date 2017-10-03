import DateRangeValidator from './daterange'
import { validGenericTextfield } from './helpers'

export default class LegalAssociationEngagedValidator {
  constructor (data = {}) {
    this.hasEngaged = data.HasEngaged
    this.list = data.List || []
    this.listBranch = data.ListBranch
  }

  validList () {
    if (this.hasEngaged === 'No') {
      return true
    }

    if (this.hasEngaged === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new EngagedValidator(item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class EngagedValidator {
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
