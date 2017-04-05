import DateRangeValidator from './daterange'
import AddressValidator from './address'
import { validNotApplicable, validDateField, validGenericTextfield } from './helpers'

export default class CardAbuseValidator {
  constructor (state = {}, props = {}) {
    this.hasCardAbuse = state.HasCardAbuse
    this.list = state.List || []
  }

  validHasCardAbuse () {
    if (!this.hasCardAbuse) {
      return false
    }

    if (!(this.hasCardAbuse === 'No' || this.hasCardAbuse === 'Yes')) {
      return false
    }

    return true
  }

  validList () {
    if (this.validHasCardAbuse() && this.hasCardAbuse === 'No') {
      return true
    }

    if (!this.list || !this.list.length) {
      return false
    }

    for (const item of this.list) {
      if (new CardAbuseItemValidator(item, null).isValid() === false) {
        return false
      }
    }

    return true
  }

  isValid () {
    return this.validHasCardAbuse() &&
      this.validList()
  }
}

export class CardAbuseItemValidator {
  constructor (state = {}, props = {}) {
    this.agency = state.Agency
    this.address = state.Address
    this.date = state.Date
    this.reason = state.Reason
    this.amount = state.Amount
    this.amountEstimated = state.AmountEstimated
    this.description = state.Description
  }

  validAgency () {
    return !!this.agency && validGenericTextfield(this.agency)
  }

  validAddress () {
    return !!this.address && new AddressValidator(this.address, null).isValid()
  }

  validDate () {
    return !!this.date && validDateField(this.date)
  }

  validReason () {
    return !!this.reason && validGenericTextfield(this.reason)
  }

  validAmount () {
    if (!this.amount || isNaN(parseInt(this.amount.value)) || parseInt(this.amount.value) <= 0) {
      return false
    }

    return true
  }

  validDescription () {
    return !!this.description && validGenericTextfield(this.description)
  }

  isValid () {
    return this.validAgency() &&
      this.validAddress() &&
      this.validDate() &&
      this.validReason() &&
      this.validAmount() &&
      this.validDescription()
  }
}
