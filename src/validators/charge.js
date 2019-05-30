import { validateModel } from 'models/validate'
import charge from 'models/shared/charge'

export const validateCharge = data => validateModel(data, charge) === true

export default class ChargeValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateCharge(this.data)
  }
}
