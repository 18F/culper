import {
  validAccordion,
  validNotApplicable,
  validDateField,
  validGenericTextfield
} from './helpers'

export default class NonpaymentValidator {
  constructor(data = {}) {
    this.hasNonpayment = (data.HasNonpayment || {}).value
    this.list = data.List || {}
  }

  validHasNonpayment() {
    if (!this.hasNonpayment) {
      return false
    }

    if (!(this.hasNonpayment === 'No' || this.hasNonpayment === 'Yes')) {
      return false
    }

    return true
  }

  validList() {
    if (this.validHasNonpayment() && this.hasNonpayment === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new NonpaymentItemValidator(item).isValid()
    })
  }

  isValid() {
    return this.validHasNonpayment() && this.validList()
  }
}

export class NonpaymentItemValidator {
  constructor(data = {}) {
    this.name = data.Name
    this.infractions = data.Infractions || []
    this.accountNumber = data.AccountNumber
    this.propertyType = data.PropertyType
    this.amount = data.Amount
    this.amountEstimated = data.AmountEstimated
    this.reason = data.Reason
    this.status = data.Status
    this.date = data.Date
    this.resolved = data.Resolved
    this.resolvedNotApplicable = data.ResolvedNotApplicable
    this.description = data.Description
  }

  validName() {
    return !!this.name && validGenericTextfield(this.name)
  }

  validInfractions() {
    const allowed = [
      'Repossession',
      'Defaulted',
      'Collections',
      'Cancelled',
      'Evicted',
      'Garnished',
      'Delinquent',
      'Any'
    ]
    return (
      !!this.infractions &&
      this.infractions.length > 0 &&
      this.infractions.every(x => {
        return allowed.includes(x)
      })
    )
  }

  validAccountNumber() {
    return !!this.accountNumber && validGenericTextfield(this.accountNumber)
  }

  validPropertyType() {
    // This is an optional value at the moment
    return true
  }

  validAmount() {
    if (
      !this.amount ||
      isNaN(parseInt(this.amount.value)) ||
      parseInt(this.amount.value) <= 0
    ) {
      return false
    }

    return true
  }

  validReason() {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validStatus() {
    return !!this.status && validGenericTextfield(this.status)
  }

  validDate() {
    return !!this.date && validDateField(this.date)
  }

  validResolved() {
    return validNotApplicable(this.resolvedNotApplicable, () => {
      return validDateField(this.resolved)
    })
  }

  validDescription() {
    return !!this.description && validGenericTextfield(this.description)
  }

  isValid() {
    return (
      this.validName() &&
      this.validAccountNumber() &&
      this.validPropertyType() &&
      this.validAmount() &&
      this.validReason() &&
      this.validStatus() &&
      this.validDate() &&
      this.validResolved() &&
      this.validDescription()
    )
  }
}
