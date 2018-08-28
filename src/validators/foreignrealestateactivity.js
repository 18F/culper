import ForeignRealEstateInterestValidator from './foreignrealestateinterest'
import { validAccordion, validBranch } from './helpers'

export default class ForeignRealEstateActivityValidator {
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
      return new ForeignRealEstateInterestValidator(item).isValid()
    })
  }
}
