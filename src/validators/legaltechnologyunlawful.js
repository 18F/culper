import AddressValidator from './address'
import { validGenericTextfield, validDateField } from './helpers'

export default class LegalTechnologyUnlawfulValidator {
  constructor (state = {}, props = {}) {
    this.hasUnlawful = props.HasUnlawful
    this.list = props.List || []
    this.listBranch = props.ListBranch
  }

  validList () {
    if (this.hasUnlawful === 'No') {
      return true
    }

    if (this.hasUnlawful === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new UnlawfulValidator(null, item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class UnlawfulValidator {
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
    return !!this.location && new AddressValidator(this.location).isValid()
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
