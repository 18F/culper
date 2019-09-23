/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import citizenshipPassports from 'models/sections/citizenshipPassports'

export const validateCitizenshipPassports = (data, formType, options = {}) => (
  validateModel(data, citizenshipPassports, options)
)
