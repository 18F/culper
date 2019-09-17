import { validateModel } from 'models/validate'
import existingConditions from 'models/existingConditions'

export const validateExistingConditions = (data, formType, options = {}) => (
  validateModel(data, existingConditions, options)
)
