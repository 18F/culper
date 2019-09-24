/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalDomesticViolence from 'models/sections/legalDomesticViolence'

export const validateDomesticViolence = (data, formType, options = {}) => (
  validateModel(data, legalDomesticViolence, options)
)
