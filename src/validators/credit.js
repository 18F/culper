import LocationValidator from './location'
import { validPhoneNumber, validGenericTextfield } from './helpers'

export default class CreditValidator {
  constructor (data = {}) {
    this.hasCreditCounseling = data.HasCreditCounseling
    this.list = data.List || []
    this.listBranch = data.ListBranch
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
      if (new CreditItemValidator(item.Item, null).isValid() === false) {
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
  constructor (data = {}) {
    this.explanation = data.Explanation
    this.name = data.Name
    this.telephone = data.Telephone
    this.location = data.Location
    this.description = data.Description
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
