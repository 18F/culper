import AddressValidator from './address'
import { validGenericTextfield, validGenericMonthYear } from './helpers'

export default class DomesticViolence {
  constructor (state = [], props = {}) {
    this.orders = state
  }

  isValid () {
    if (!this.orders || !this.orders.length) {
      return false
    }

    for (let order of this.orders) {
      if (order.Has === 'No') {
        continue
      }
      if (!new DomesticViolenceItem(order.domestic).isValid()) {
        return false
      }
    }

    return true
  }
}

export class DomesticViolenceItem {
  constructor (state = {}) {
    this.courtAddress = state.CourtAddress
    this.courtName = state.CourtName
    this.explanation = state.Explanation
    this.issued = state.Issued
  }

  isValid () {
    return new AddressValidator(this.courtAddress).isValid() &&
      validGenericTextfield(this.courtName) &&
      validGenericTextfield(this.explanation) &&
      validGenericMonthYear(this.issued)
  }
}
