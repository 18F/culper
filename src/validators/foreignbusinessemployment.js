import NameValidator from './name'
import LocationValidator from './location'
import { validAccordion, validGenericTextfield, validDateField } from './helpers'

export default class ForeignBusinessEmploymentValidator {
  constructor (data = {}) {
    this.hasForeignEmployment = (data.HasForeignEmployment || {}).value
    this.list = data.List || {}
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
  constructor (data = {}) {
    this.name = data.Name
    this.description = data.Description
    this.date = data.Date
    this.address = data.Address
    this.accepted = (data.Accepted || {}).value
    this.explanation = data.Explanation
  }

  validName () {
    return !!this.name && new NameValidator(this.name).isValid()
  }

  validDescription () {
    return !!this.description && validGenericTextfield(this.description)
  }

  validDate () {
    return !!this.date && validDateField(this.date)
  }

  validAddress () {
    return !!this.address && new LocationValidator(this.address).isValid()
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
