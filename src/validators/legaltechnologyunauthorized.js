import LocationValidator from './location'
import { validGenericTextfield, validDateField } from './helpers'

export default class LegalTechnologyUnauthorizedValidator {
  constructor (data = {}) {
    this.hasUnauthorized = data.HasUnauthorized
    this.list = data.List || []
    this.listBranch = data.ListBranch
  }

  validList () {
    if (this.hasUnauthorized === 'No') {
      return true
    }

    if (this.hasUnauthorized === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new UnauthorizedValidator(item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class UnauthorizedValidator {
  constructor (data = {}) {
    this.date = data.Date
    this.incident = data.Incident
    this.location = data.Location
    this.action = data.Action
  }

  validDate () {
    return !!this.date && validDateField(this.date)
  }

  validIncident () {
    return !!this.incident && validGenericTextfield(this.incident)
  }

  validLocation () {
    return !!this.location && new LocationValidator(this.location).isValid()
  }

  validAction () {
    return !!this.action && validGenericTextfield(this.action)
  }

  isValid () {
    return this.validDate() &&
      this.validIncident() &&
      this.validLocation() &&
      this.validAction()
  }
}
