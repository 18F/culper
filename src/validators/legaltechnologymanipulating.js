/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalTechnologyManipulating from 'models/sections/legalTechnologyManipulating'

export const validateLegalTechnologyManipulating = (data, formType, options = {}) => (
  validateModel(data, legalTechnologyManipulating, options)
)
