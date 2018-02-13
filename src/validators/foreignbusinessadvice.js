import NameValidator from './name'
import DateRangeValidator from './daterange'
import { validAccordion, validGenericTextfield } from './helpers'

export default class ForeignBusinessAdviceValidator {
  constructor (data = {}) {
    this.hasForeignAdvice = (data.HasForeignAdvice || {}).value
    this.list = data.List || []
  }

  validList () {
    if (this.hasForeignAdvice === 'No') {
      return true
    }

    return validAccordion(this.list, (item) => {
      return new AdviceValidator(item).isValid()
    })
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
    return !!this.name && new NameValidator(this.name).isValid()
  }

  validOrganization () {
    return !!this.organization && validGenericTextfield(this.organization)
  }

  validCountry () {
    return !!this.country && validGenericTextfield(this.country)
  }

  validDates () {
    return !!this.dates && new DateRangeValidator(this.dates).isValid()
  }

  isValid () {
    return this.validDescription() &&
      this.validName() &&
      this.validOrganization() &&
      this.validCountry() &&
      this.validDates()
  }
}
