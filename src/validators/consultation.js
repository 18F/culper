import { validateModel } from 'models/validate'
import consultation from 'models/consultation'

export const validateCompetence = data => (
  validateModel(data, consultation) === true
)

export default class ConsultationValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateCompetence(this.data)
  }
}
