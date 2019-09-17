import { validateModel } from 'models/validate'
import identificationContactInfo, {
  contactPhoneNumber,
} from 'models/sections/identificationContactInfo'

export const validateIdentificationContactInformation = (data, formType, options = {}) => (
  validateModel(data, identificationContactInfo, options)
)
