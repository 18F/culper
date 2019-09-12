import militaryHistory from 'models/militaryHistory'
import { validateModel } from 'models/validate'

export const validateMilitaryHistory = (data, formType, options = {}) => (
  validateModel(data, militaryHistory, options)
)
