import { validGenericTextfield } from './helpers'

export default class MilitaryHistoryValidator {
  constructor (state, props) {
    this.hasServed = state.HasServed
  }

  validServed () {
    return this.hasServed === 'Yes' || this.hasServed === 'No'
  }

  isValid () {
    return this.validServed()
  }
}
