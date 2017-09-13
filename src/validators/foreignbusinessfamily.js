import NameValidator from './name'
import { validGenericTextfield, validDateField } from './helpers'

export default class ForeignBusinessFamilyValidator {
  constructor (data = {}) {
    this.hasForeignFamily = data.HasForeignFamily
    this.list = data.List || []
    this.listBranch = data.ListBranch
  }

  validList () {
    if (this.hasForeignFamily === 'No') {
      return true
    }

    if (this.hasForeignFamily === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      if (this.listBranch !== 'No') {
        return false
      }

      return this.list.every(item => new FamilyValidator(item.Item).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class FamilyValidator {
  constructor (data = {}) {
    this.name = data.Name
    this.agency = data.Agency
    this.country = data.Country
    this.date = data.Date
    this.circumstances = data.Circumstances
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
