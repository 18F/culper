import AddressValidator from './address'
import { validPhoneNumber, validGenericTextfield } from './helpers'

export default class CreditValidator {
  constructor (state = {}, props = {}) {
    this.hasCreditCounseling = state.HasCreditCounseling
    this.list = state.List || []
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
    this.address = state.Address
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

  validAddress () {
    return !!this.address && new AddressValidator(this.address, null).isValid()
  }

  validDescription () {
    return !!this.description && validGenericTextfield(this.description)
  }

  isValid () {
    return this.validExplanation() &&
      this.validName() &&
      this.validTelephone() &&
      this.validAddress() &&
      this.validDescription()
  }
}
