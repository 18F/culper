import ForeignBenefitValidator from './foreignbenefit'
import { validBranch } from './helpers'

export default class ForeignBenefitActivityValidator {
  constructor (data = {}) {
    data = data || {}
    this.hasBenefits = data.HasBenefits || ''
    this.list = data.List || []
    this.listBranch = data.ListBranch
  }

  isValid () {
    if (!validBranch(this.hasBenefits)) {
      return false
    }
    if (this.hasBenefits === 'No') {
      return true
    }

    if (this.hasBenefits === 'Yes' && !this.list.length) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    return this.list.every((item) => {
      return new ForeignBenefitValidator(item.Item).isValid()
    })
  }
}
