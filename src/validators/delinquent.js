import AddressValidator from './address'
import { validNotApplicable, validDateField, validGenericTextfield } from './helpers'

export default class DelinquentValidator {
  constructor (state = {}, props = {}) {
    this.hasDelinquent = state.HasDelinquent
    this.list = state.List || []
  }

  validHasDelinquent () {
    if (!this.hasDelinquent) {
      return false
    }

    if (!(this.hasDelinquent === 'No' || this.hasDelinquent === 'Yes')) {
      return false
    }

    return true
  }

  validList () {
    if (this.validHasDelinquent() && this.hasDelinquent === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    for (const item of this.list) {
      if (new DelinquentItemValidator(item, null).isValid() === false) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validHasDelinquent() &&
      this.validList()
  }
}

export class DelinquentItemValidator {
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
    this.courtName = state.CourtName
    this.courtAddress = state.CourtAddress
    this.description = state.Description
  }

  validName () {
    return !!this.name && validGenericTextfield(this.name)
  }

  validInfractions () {
    const allowed = ['Alimony', 'Judgement', 'Lien', 'Federal']
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

  validCourtName () {
    return !!this.courtName && validGenericTextfield(this.courtName)
  }

  validCourtAddress () {
    return !!this.courtAddress && new AddressValidator(this.courtAddress, null).isValid()
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
      this.validCourtName() &&
      this.validCourtAddress() &&
      this.validDescription()
  }
}
