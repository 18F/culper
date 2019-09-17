import { validateModel } from 'models/validate'
import identificationOtherNames from 'models/sections/identificationOtherNames'
import identificationOtherName from 'models/identificationOtherName'

export const validateOtherName = data => (
  validateModel(data, identificationOtherName)
)

export const validateOtherNames = (data, formType, options = {}) => (
  validateModel(data, identificationOtherNames, options)
)
