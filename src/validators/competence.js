import { validateModel } from 'models/validate'
import competence from 'models/competence'

export const validateCompetence = (data, formType, options = {}) => (
  validateModel(data, competence, options)
)
