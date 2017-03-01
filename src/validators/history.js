import EmploymentValidator from './employment'

export default class HistoryValidator {
  constructor (state, props) {
    this.list = state.List
  }

  validEmployment () {
    for (let employment of this.list.filter(item => { return item.type === 'Employment' })) {
      if (!new EmploymentValidator(employment.Item).isValid()) {
        return false
      }
    }
    return true
  }

  isValid () {
    return this.validEmployment()
  }
}
