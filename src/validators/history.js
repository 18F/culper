import { EmploymentValidator } from './employment'
import { validAccordion } from './helpers'

export default class HistoryValidator {
  constructor(data = {}) {
    this.list = data.List || { items: [] }
  }

  validEmployment() {
    return validAccordion(
      this.list,
      item => {
        return new EmploymentValidator(item).isValid()
      },
      true
    )
  }

  isValid() {
    return this.validEmployment()
  }
}
