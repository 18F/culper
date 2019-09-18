/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import identificationOtherNames from 'models/sections/identificationOtherNames'

export const validateOtherNames = (data, formType, options = {}) => (
  validateModel(data, identificationOtherNames, options)
)
