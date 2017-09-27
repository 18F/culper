import NameValidator from './name'
import DateRangeValidator from './daterange'
import { validGenericTextfield } from './helpers'

export default class ForeignBusinessAdviceValidator {
  constructor (data = {}) {
    this.hasForeignAdvice = data.HasForeignAdvice
    this.list = data.List || []
    this.listBranch = data.ListBranch
  }

  validList () {
    if (this.hasForeignAdvice === 'No') {
      return true
    }

    if (this.hasForeignAdvice === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new AdviceValidator(item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class AdviceValidator {
  constructor (data = {}) {
    this.description = data.Description
    this.name = data.Name
    this.organization = data.Organization
    this.country = data.Country
    this.dates = data.Dates
    this.compensation = data.Compensation // optional
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
