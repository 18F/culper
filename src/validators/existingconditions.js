import { validateModel } from 'models/validate'
import existingConditions from 'models/existingConditions'

export const validateExistingConditions = data => (
  validateModel(data, existingConditions)
)
