import { CompetenceOrderValidator } from './order'

export default class CompetenceValidator {
  constructor (state = {}, props) {
    this.list = state.List || []
    this.listBranch = state.ListBranch
    this.isIncompetent = (state.IsIncompetent || {}).value
  }

  validIsIncompetent () {
    return this.isIncompetent === 'Yes' || this.isIncompetent === 'No'
  }

  validList () {
    if (this.isIncompetent === 'Yes' && this.list.length === 0) {
      return false
    }

    if (this.listBranch !== 'No') {
      return false
    }

    for (let order of this.list) {
      if (!new CompetenceOrderValidator(order.Item).isValid()) {
        return false
      }
    }

    return true
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
