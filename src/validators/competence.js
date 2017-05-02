import OrderValidator from './order'

export default class CompetenceValidator {
  constructor (state = {}, props) {
    this.list = state.List || []
    this.isIncompetent = state.IsIncompetent
  }

  validIsIncompetent () {
    return this.isIncompetent === 'Yes' || this.isIncompetent === 'No'
  }

  validList () {
    if (this.isIncompetent === 'Yes' && this.list.length === 0) {
      return false
    }

    for (let order of this.list) {
      if (!new OrderValidator(order.Competence, { prefix: 'competence' }).isValid()) {
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
