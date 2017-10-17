import OffenseValidator from './offense'
import { validBranch } from './helpers'

export default class PoliceOffensesValidator {
  constructor (data = {}) {
    this.hasOffenses = (data.HasOffenses || {}).value
    this.list = data.List || []
    this.listBranch = data.ListBranch
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
      if (new OffenseValidator(offense.Item).isValid() !== true) {
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
