import LocationValidator from './location'
import {
  validAccordion,
  validGenericTextfield,
  validDateField
} from './helpers'

export default class LegalTechnologyUnauthorizedValidator {
  constructor(data = {}) {
    this.hasUnauthorized = (data.HasUnauthorized || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasUnauthorized === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new UnauthorizedValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class UnauthorizedValidator {
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
