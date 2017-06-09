import OffenseValidator from './offense'
import { validBranch } from './helpers'

export default class PoliceOffensesValidator {
  constructor (state = {}, props = {}) {
    this.hasOffenses = state.HasOffenses
    this.list = state.List || []
    this.listBranch = state.ListBranch
  }

  validItems () {
    if (this.hasOffenses === 'No') {
      return true
    }

    if (this.list.length === 0) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (const offense of this.list) {
      if (new OffenseValidator(offense.Item, null).isValid() !== true) {
        return false
      }
    }
    return true
  }

  isValid () {
    return validBranch(this.hasOffenses) &&
      this.validItems()
  }
}
