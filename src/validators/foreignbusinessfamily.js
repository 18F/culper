import NameValidator from './name'
import {
  validAccordion,
  validGenericTextfield,
  validDateField
} from './helpers'

export default class ForeignBusinessFamilyValidator {
  constructor(data = {}) {
    this.hasForeignFamily = (data.HasForeignFamily || {}).value
    this.list = data.List || {}
  }

  validList() {
    if (this.hasForeignFamily === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new FamilyValidator(item).isValid()
    })
  }

  isValid() {
    return this.validList()
  }
}

export class FamilyValidator {
  constructor(data = {}) {
    this.name = data.Name
    this.agency = data.Agency
    this.country = data.Country
    this.date = data.Date
    this.circumstances = data.Circumstances
  }

  validName() {
    return !!this.name && new NameValidator(this.name).isValid()
  }

  validAgency() {
    return !!this.agency && validGenericTextfield(this.agency)
  }

  validCountry() {
    return !!this.country && validGenericTextfield(this.country)
  }

  validDate() {
    return !!this.date && validDateField(this.date)
  }

  validCircumstances() {
    return !!this.circumstances && validGenericTextfield(this.circumstances)
  }

  isValid() {
    return (
      this.validName() &&
      this.validAgency() &&
      this.validCountry() &&
      this.validDate() &&
      this.validCircumstances()
    )
  }
}
