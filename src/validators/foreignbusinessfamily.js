import NameValidator from './name'
import { validGenericTextfield, validDateField } from './helpers'

export default class ForeignBusinessFamilyValidator {
  constructor (state = {}, props = {}) {
    this.hasForeignFamily = state.HasForeignFamily
    this.list = state.List || []
  }

  validList () {
    if (this.hasForeignFamily === 'No') {
      return true
    }

    if (this.hasForeignFamily === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      return this.list.every(item => new FamilyValidator(item, null).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class FamilyValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.agency = state.Agency
    this.country = state.Country
    this.date = state.Date
    this.circumstances = state.Circumstances
  }

  validName () {
    return !!this.name && new NameValidator(this.name, null).isValid()
  }

  validAgency () {
    return !!this.agency && validGenericTextfield(this.agency)
  }

  validCountry () {
    return !!this.country && validGenericTextfield(this.country)
  }

  validDate () {
    return !!this.date && validDateField(this.date)
  }

  validCircumstances () {
    return !!this.circumstances && validGenericTextfield(this.circumstances)
  }

  isValid () {
    return this.validName() &&
      this.validAgency() &&
      this.validCountry() &&
      this.validDate() &&
      this.validCircumstances()
  }
}
