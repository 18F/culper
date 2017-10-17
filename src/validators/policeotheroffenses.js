import OtherOffenseValidator from './otheroffense'
import { validBranch } from './helpers'

export default class PoliceOtherOffensesValidator {
  constructor (data = {}) {
    this.list = data.List || []
    this.listBranch = data.ListBranch
    this.hasOtherOffenses = (data.HasOtherOffenses || {}).value
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
      if (new OtherOffenseValidator(otherOffense.Item).isValid() !== true) {
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
