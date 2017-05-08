import NameValidator from './name'
import DateRangeValidator from './daterange'
import { validGenericTextfield } from './helpers'

export default class ForeignBusinessAdviceValidator {
  constructor (state = {}, props = {}) {
    this.hasForeignAdvice = state.HasForeignAdvice
    this.list = state.List || []
  }

  validList () {
    if (this.hasForeignAdvice === 'No') {
      return true
    }

    if (this.hasForeignAdvice === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      return this.list.every(item => new AdviceValidator(item, null).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class AdviceValidator {
  constructor (state = {}, props = {}) {
    this.description = state.Description
    this.name = state.Name
    this.organization = state.Organization
    this.country = state.Country
    this.dates = state.Dates
    this.compensation = state.Compensation // optional
  }

  validDescription () {
    return !!this.description && validGenericTextfield(this.description)
  }

  validName () {
    return !!this.name && new NameValidator(this.name, null).isValid()
  }

  validOrganization () {
    return !!this.organization && validGenericTextfield(this.organization)
  }

  validCountry () {
    return !!this.country && validGenericTextfield(this.country)
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates, null).isValid()
  }

  isValid () {
    return this.validDescription() &&
      this.validName() &&
      this.validOrganization() &&
      this.validCountry() &&
      this.validDates()
  }
}
