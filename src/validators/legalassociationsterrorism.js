import { validateModel } from 'models/validate'
import terrorism from 'models/terrorism'

export const validateLegalAssociationTerrorism = (data, formType, options = {}) => (
  validateModel(data, terrorism, options)
)
