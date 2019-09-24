/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalTechnologyUnauthorized from 'models/sections/legalTechnologyUnauthorized'

export const validateLegalTechnologyUnauthorized = (data, formType, options = {}) => (
  validateModel(data, legalTechnologyUnauthorized, options)
)
