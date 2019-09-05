import { validateModel } from 'models/validate'
import treatment from 'models/treatment'

export const validateTreatment = data => validateModel(data, treatment)

export default class TreatmentValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateTreatment(this.data) === true
  }
}
