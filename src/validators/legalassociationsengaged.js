import DateRangeValidator from './daterange'
import { validGenericTextfield } from './helpers'

export default class LegalAssociationEngagedValidator {
  constructor (state = {}, props = {}) {
    this.hasEngaged = props.HasEngaged
    this.list = props.List || []
    this.listBranch = props.ListBranch
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

      return this.list.every(item => new EngagedValidator(null, item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class EngagedValidator {
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
