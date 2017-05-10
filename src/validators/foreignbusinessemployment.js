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

      return this.list.every(item => new EmploymentValidator(item.Item, null).isValid())
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
    this.accepted = state.Accepted
    this.explanation = state.Explanation
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
    if (this.accepted === 'No') {
      return true
    }

    if (this.accepted === 'Yes') {
      return !!this.explanation && validGenericTextfield(this.explanation)
    }

    return false
  }

  isValid () {
    return this.validName() &&
      this.validDescription() &&
      this.validDate() &&
      this.validAddress() &&
      this.validAcceptance()
  }
}
