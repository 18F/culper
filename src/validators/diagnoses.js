import { validateModel } from 'models/validate'
import diagnoses from 'models/diagnoses'

export const validateDiagnoses = (data, formType, options = {}) => (
  validateModel(data, diagnoses, options)
)
