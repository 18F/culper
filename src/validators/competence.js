import { CompetenceOrderValidator } from './order'
import { validAccordion } from './helpers'

export default class CompetenceValidator {
  constructor (state = {}, props) {
    this.list = state.List || {}
    this.isIncompetent = (state.IsIncompetent || {}).value
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
