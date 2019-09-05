/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import identificationName from 'models/sections/identificationName'

export const validateIdentificationName = (data, formType, options = {}) => (
  validateModel(data, identificationName, options)
)
