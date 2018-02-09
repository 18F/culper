import { CompetenceOrderValidator } from './order'
import { validAccordion } from './helpers'

export default class CompetenceValidator {
  constructor (data = {}) {
    this.list = data.List || {}
    this.isIncompetent = (data.IsIncompetent || {}).value
  }

  validIsIncompetent () {
    return this.isIncompetent === 'Yes' || this.isIncompetent === 'No'
  }

  validList () {
    if (this.isIncompetent === 'No') {
      return true
    }

    return validAccordion(this.list, (item) => {
      return new CompetenceOrderValidator(item).isValid()
    })
  }

  isValid () {
    if (!this.validIsIncompetent()) {
      return false
    }

    if (this.isIncompetent === 'No') {
      return true
    }

    return this.validList()
  }
}
