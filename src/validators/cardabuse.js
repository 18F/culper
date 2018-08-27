import LocationValidator from './location'
import {
  validAccordion,
  validDateField,
  validGenericTextfield
} from './helpers'

export default class CardAbuseValidator {
  constructor(data = {}) {
    this.hasCardAbuse = (data.HasCardAbuse || {}).value
    this.list = data.List || {}
  }

  validHasCardAbuse() {
    if (!this.hasCardAbuse) {
      return false
    }

    if (!(this.hasCardAbuse === 'No' || this.hasCardAbuse === 'Yes')) {
      return false
    }

    return true
  }

  validList() {
    if (this.validHasCardAbuse() && this.hasCardAbuse === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new CardAbuseItemValidator(item).isValid()
    })
  }

  isValid() {
    return this.validHasCardAbuse() && this.validList()
  }
}

export class CardAbuseItemValidator {
  constructor(data = {}) {
    this.agency = data.Agency
    this.address = data.Address
    this.date = data.Date
    this.reason = data.Reason
    this.amount = data.Amount
    this.amountEstimated = data.AmountEstimated
    this.description = data.Description
  }

  validAgency() {
    return !!this.agency && validGenericTextfield(this.agency)
  }

  validAddress() {
    return !!this.address && new LocationValidator(this.address).isValid()
  }

  validDate() {
    return !!this.date && validDateField(this.date)
  }

  validReason() {
    return !!this.reason && validGenericTextfield(this.reason)
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

  validDescription() {
    return !!this.description && validGenericTextfield(this.description)
  }

  isValid() {
    return (
      this.validAgency() &&
      this.validAddress() &&
      this.validDate() &&
      this.validReason() &&
      this.validAmount() &&
      this.validDescription()
    )
  }
}
