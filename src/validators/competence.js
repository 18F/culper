import { validateModel } from 'models/validate'
import competence from 'models/competence'

export const validateCompetence = data => (
  validateModel(data, competence) === true
)

export default class CompetenceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateCompetence(this.data)
  }
}
