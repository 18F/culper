import LocationValidator from './location'
import { validPhoneNumber, validGenericTextfield } from './helpers'

export default class CreditValidator {
  constructor (state = {}, props = {}) {
    this.hasCreditCounseling = state.HasCreditCounseling
    this.list = state.List || []
    this.listBranch = state.ListBranch
  }

  validHasCreditCounseling () {
    if (!this.hasCreditCounseling) {
      return false
    }

    if (!(this.hasCreditCounseling === 'No' || this.hasCreditCounseling === 'Yes')) {
      return false
    }

    return true
  }

  validList () {
    if (this.validHasCreditCounseling() && this.hasCreditCounseling === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      if (new CreditItemValidator(item, null).isValid() === false) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validHasCreditCounseling() &&
      this.validList()
  }
}

export class CreditItemValidator {
  constructor (state = {}, props = {}) {
    this.explanation = state.Explanation
    this.name = state.Name
    this.telephone = state.Telephone
    this.location = state.Location
    this.description = state.Description
  }

  validExplanation () {
    return !!this.explanation && validGenericTextfield(this.explanation)
  }

  validName () {
    return !!this.name && validGenericTextfield(this.name)
  }

  validTelephone () {
    return !!this.telephone && validPhoneNumber(this.telephone)
  }

  validLocation () {
    return !!this.location && new LocationValidator(this.location).isValid()
  }

  validDescription () {
    return !!this.description && validGenericTextfield(this.description)
  }

  isValid () {
    return this.validExplanation() &&
      this.validName() &&
      this.validTelephone() &&
      this.validLocation() &&
      this.validDescription()
  }
}
