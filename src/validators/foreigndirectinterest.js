import { validateModel } from 'models/validate'
import foreignDirectInterest from 'models/foreignDirectInterest'

export const validateForeignDirectInterest = data => (
  validateModel(data, foreignDirectInterest)
)

export default class ForeignDirectInterestValidator {
  constructor(data = {}) {
    this.data = data
  }

  validInterestTypes() {
    return validateModel(this.data, {
      InterestTypes: foreignDirectInterest.InterestTypes,
    }) === true
  }

  isValid() {
    return validateForeignDirectInterest(this.data) === true
  }
}
