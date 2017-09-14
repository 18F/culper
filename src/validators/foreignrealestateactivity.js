import ForeignRealEstateInterestValidator from './foreignrealestateinterest'
import { validBranch } from './helpers'

export default class ForeignRealEstateActivityValidator {
  constructor (data = {}) {
    this.hasInterests = data.HasInterests || ''
    this.list = data.List || []
    this.listBranch = data.ListBranch
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

    if (this.listBranch !== 'No') {
      return false
    }

    return this.list.every((item) => {
      return new ForeignRealEstateInterestValidator(item.Item).isValid()
    })
  }
}
