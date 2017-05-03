import NameValidator from './name'
import AddressValidator from './address'
import { validGenericTextfield, validDateField } from './helpers'

export default class ForeignBusinessEmploymentValidator {
  constructor (state = {}, props = {}) {
    this.hasForeignEmployment = state.HasForeignEmployment
    this.list = state.List || []
  }

  validList () {
    if (this.hasForeignEmployment === 'No') {
      return true
    }

    if (this.hasForeignEmployment === 'Yes') {
      if (!this.list || this.list.length === 0) {
        return false
      }

      return this.list.every(item => new EmploymentValidator(item, null).isValid())
    }

    return false
  }

  isValid () {
    return this.validList()
  }
}

export class EmploymentValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.description = state.Description
    this.date = state.Date
    this.address = state.Address
    this.acceptance = state.Acceptance
  }

  validName () {
    return !!this.name && new NameValidator(this.name, null).isValid()
  }

  validDescription () {
    return !!this.description && validGenericTextfield(this.description)
  }

  validDate () {
    return !!this.date && validDateField(this.date)
  }

  validAddress () {
    return !!this.address && new AddressValidator(this.address, null).isValid()
  }

  validAcceptance () {
    return !!this.acceptance && validGenericTextfield(this.acceptance)
  }

  isValid () {
    return this.validName() &&
      this.validDescription() &&
      this.validDate() &&
      this.validAddress() &&
      this.validAcceptance()
  }
}
