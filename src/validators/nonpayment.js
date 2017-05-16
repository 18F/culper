import { validNotApplicable, validDateField, validGenericTextfield } from './helpers'

export default class NonpaymentValidator {
  constructor (state = {}, props = {}) {
    this.hasNonpayment = state.HasNonpayment
    this.list = state.List || []
    this.listBranch = state.ListBranch
  }

  validHasNonpayment () {
    if (!this.hasNonpayment) {
      return false
    }

    if (!(this.hasNonpayment === 'No' || this.hasNonpayment === 'Yes')) {
      return false
    }

    return true
  }

  validList () {
    if (this.validHasNonpayment() && this.hasNonpayment === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const item of this.list) {
      if (new NonpaymentItemValidator(item, null).isValid() === false) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validHasNonpayment() &&
      this.validList()
  }
}

export class NonpaymentItemValidator {
  constructor (state = {}, props = {}) {
    this.name = state.Name
    this.infractions = state.Infractions || []
    this.accountNumber = state.AccountNumber
    this.propertyType = state.PropertyType
    this.amount = state.Amount
    this.amountEstimated = state.AmountEstimated
    this.reason = state.Reason
    this.status = state.Status
    this.date = state.Date
    this.resolved = state.Resolved
    this.resolvedNotApplicable = state.ResolvedNotApplicable
    this.description = state.Description
  }

  validName () {
    return !!this.name && validGenericTextfield(this.name)
  }

  validInfractions () {
    const allowed = ['Repossession', 'Defaulted', 'Collections', 'Cancelled', 'Evicted', 'Garnished', 'Delinquent', 'Any']
    return !!this.infractions &&
      this.infractions.length > 0 &&
      this.infractions.every(x => { return allowed.includes(x) })
  }

  validAccountNumber () {
    return !!this.accountNumber && validGenericTextfield(this.accountNumber)
  }

  validPropertyType () {
    // This is an optional value at the moment
    return true
  }

  validAmount () {
    if (!this.amount || isNaN(parseInt(this.amount.value)) || parseInt(this.amount.value) <= 0) {
      return false
    }

    return true
  }

  validReason () {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validStatus () {
    return !!this.status && validGenericTextfield(this.status)
  }

  validDate () {
    return !!this.date && validDateField(this.date)
  }

  validResolved () {
    return validNotApplicable(this.resolvedNotApplicable, () => { return validDateField(this.resolved) })
  }

  validDescription () {
    return !!this.description && validGenericTextfield(this.description)
  }

  isValid () {
    return this.validName() &&
      this.validAccountNumber() &&
      this.validPropertyType() &&
      this.validAmount() &&
      this.validReason() &&
      this.validStatus() &&
      this.validDate() &&
      this.validResolved() &&
      this.validDescription()
  }
}
