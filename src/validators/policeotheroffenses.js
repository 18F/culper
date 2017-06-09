import OtherOffenseValidator from './otheroffense'
import { validBranch } from './helpers'

export default class PoliceOtherOffensesValidator {
  constructor (state = {}, props = {}) {
    this.list = state.List || []
    this.listBranch = state.ListBranch
    this.hasOtherOffenses = state.HasOtherOffenses
  }

  validItems () {
    if (this.hasOtherOffenses === 'No') {
      return true
    }

    if (this.listBranch !== 'No') {
      return false
    }

    if (this.list.length === 0) {
      return false
    }

    for (const otherOffense of this.list) {
      if (new OtherOffenseValidator(otherOffense.Item, null).isValid() !== true) {
        return false
      }
    }
    return true
  }

  isValid () {
    return validBranch(this.hasOtherOffenses) &&
      this.validItems()
  }
}
