import LocationValidator from './location'
import { validGenericTextfield, validDateField } from './helpers'

export default class LegalTechnologyManipulatingValidator {
  constructor (data = {}) {
    this.hasManipulating = (data.HasManipulating || {}).value
    this.list = data.List || []
    this.listBranch = data.ListBranch
  }

  validList () {
    if (this.hasManipulating === 'No') {
      return true
    }

    if (this.hasManipulating === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new ManipulatingValidator(item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class ManipulatingValidator {
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
