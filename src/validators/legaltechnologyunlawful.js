import LocationValidator from './location'
import {
  validAccordion,
  validGenericTextfield,
  validDateField
} from './helpers'

export default class LegalTechnologyUnlawfulValidator {
  constructor(data = {}) {
    this.hasUnlawful = (data.HasUnlawful || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasUnlawful === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new UnlawfulValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class UnlawfulValidator {
  constructor(data = {}) {
    this.date = data.Date
    this.incident = data.Incident
    this.location = data.Location
    this.action = data.Action
  }

  validDate() {
    return !!this.date && validDateField(this.date)
  }

  validIncident() {
    return !!this.incident && validGenericTextfield(this.incident)
  }

  validLocation() {
    return !!this.location && new LocationValidator(this.location).isValid()
  }

  validAction() {
    return !!this.action && validGenericTextfield(this.action)
  }

  isValid() {
    return (
      this.validDate() &&
      this.validIncident() &&
      this.validLocation() &&
      this.validAction()
    )
  }
}
