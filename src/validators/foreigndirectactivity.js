import ForeignDirectInterestValidator from './foreigndirectinterest'
import { validAccordion, validBranch } from './helpers'

export default class ForeignDirectActivityValidator {
  constructor (state, props = {}) {
    this.hasInterests = (props.HasInterests || {}).value
    this.list = props.List || {}
  }

  isValid () {
    if (!validBranch(this.hasInterests)) {
      return false
    }

    if (this.hasInterests === 'No') {
      return true
    }

    return validAccordion(this.list, (item) => {
      return new ForeignDirectInterestValidator(item).isValid()
    })
  }
}
