/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalTechnologyUnlawful from 'models/sections/legalTechnologyUnlawful'

export const validateLegalTechnologyUnlawful = (data, formType, options = {}) => (
  validateModel(data, legalTechnologyUnlawful, options)
)
