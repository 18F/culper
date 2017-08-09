import LocationValidator from './location'
import { validGenericTextfield, validDateField } from './helpers'

export default class LegalTechnologyManipulatingValidator {
  constructor (state = {}, props = {}) {
    this.hasManipulating = props.HasManipulating
    this.list = props.List || []
    this.listBranch = props.ListBranch
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

      return this.list.every(item => new ManipulatingValidator(null, item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class ManipulatingValidator {
  constructor (state = {}, props = {}) {
    this.date = props.Date
    this.incident = props.Incident
    this.location = props.Location
    this.action = props.Action
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
