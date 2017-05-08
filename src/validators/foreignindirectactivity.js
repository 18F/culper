import ForeignIndirectInterestValidator from './foreignindirectinterest'
import { validBranch } from './helpers'

export default class ForeignIndirectActivityValidator {
  constructor (state, props = {}) {
    this.hasInterests = props.HasInterests || ''
    this.list = props.List || []
  }

  isValid () {
    if (!validBranch(this.hasInterests)) {
      return false
    }
    if (this.hasInterests === 'No') {
      return true
    }

    if (this.hasInterests === 'Yes' && !this.list.length) {
      return false
    }

    return this.list.every((item) => {
      return new ForeignIndirectInterestValidator(null, item.IndirectInterest).isValid()
    })
  }
}
