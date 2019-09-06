/* eslint import/prefer-default-export: 0 */
import { validateModel } from 'models/validate'
import identificationPhysical from 'models/sections/identificationPhysical'

export const validateIdentificationPhysical = (data, formType, options = {}) => (
  validateModel(data, identificationPhysical, options)
)
