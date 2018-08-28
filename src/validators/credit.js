import LocationValidator from './location'
import {
  validAccordion,
  validPhoneNumber,
  validGenericTextfield
} from './helpers'

export default class CreditValidator {
  constructor(data = {}) {
    this.hasCreditCounseling = (data.HasCreditCounseling || {}).value
    this.list = data.List || {}
  }

  validHasCreditCounseling() {
    if (!this.hasCreditCounseling) {
      return false
    }

    if (
      !(this.hasCreditCounseling === 'No' || this.hasCreditCounseling === 'Yes')
    ) {
      return false
    }

    return true
  }

  validList() {
    if (this.validHasCreditCounseling() && this.hasCreditCounseling === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new CreditItemValidator(item).isValid()
    })
  }

  isValid() {
    return this.validHasCreditCounseling() && this.validList()
  }
}

export class CreditItemValidator {
  constructor(data = {}) {
    this.explanation = data.Explanation
    this.name = data.Name
    this.telephone = data.Telephone
    this.location = data.Location
    this.description = data.Description
  }

  validExplanation() {
    return !!this.explanation && validGenericTextfield(this.explanation)
  }

  validName() {
    return !!this.name && validGenericTextfield(this.name)
  }

  validTelephone() {
    return !!this.telephone && validPhoneNumber(this.telephone)
  }

  validLocation() {
    return !!this.location && new LocationValidator(this.location).isValid()
  }

  validDescription() {
    return !!this.description && validGenericTextfield(this.description)
  }

  isValid() {
    return (
      this.validExplanation() &&
      this.validName() &&
      this.validTelephone() &&
      this.validLocation() &&
      this.validDescription()
    )
  }
}
