import ForeignIndirectInterestValidator from './foreignindirectinterest'
import { validAccordion, validBranch } from './helpers'

export default class ForeignIndirectActivityValidator {
  constructor(data = {}) {
    this.hasInterests = (data.HasInterests || {}).value
    this.list = data.List || {}
  }

  isValid() {
    if (!validBranch(this.hasInterests)) {
      return false
    }

    if (this.hasInterests === 'No') {
      return true
    }

    return validAccordion(this.list, item => {
      return new ForeignIndirectInterestValidator(item).isValid()
    })
  }
}
