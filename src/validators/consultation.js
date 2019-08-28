import { validateModel } from 'models/validate'
import consultation from 'models/consultation'

export const validateConsultations = data => (
  validateModel(data, consultation)
)

export default class ConsultationValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateConsultations(this.data) === true
  }
}
