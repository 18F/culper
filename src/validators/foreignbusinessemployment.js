import NameValidator from './name'
import LocationValidator from './location'
import { validAccordion, validGenericTextfield, validDateField } from './helpers'

export default class ForeignBusinessEmploymentValidator {
  constructor (state = {}, props = {}) {
    this.hasForeignEmployment = (state.HasForeignEmployment || {}).value
    this.list = state.List || {}
  }

  validList () {
    if (this.hasForeignEmployment === 'No') {
      return true
    }

    return validAccordion(this.list, (item) => {
      return new ForeignBusinessEmploymentItemValidator(item).isValid()
    })
  }

  isValid () {
    return this.validList()
  }
}

export class ForeignBusinessEmploymentItemValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.description = state.Description
    this.date = state.Date
    this.address = state.Address
    this.accepted = (state.Accepted || {}).value
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
    return !!this.address && new LocationValidator(this.address, null).isValid()
  }

  validAcceptance () {
    if (this.accepted === 'Yes' || this.accepted === 'No') {
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
