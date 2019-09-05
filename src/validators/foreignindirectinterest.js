import { validateModel } from 'models/validate'
import foreignIndirectInterest from 'models/foreignIndirectInterest'

export const validateForeignIndirectInterest = data => (
  validateModel(data, foreignIndirectInterest)
)

export default class ForeignIndirectInterestValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignIndirectInterest(this.data) === true
  }
}
