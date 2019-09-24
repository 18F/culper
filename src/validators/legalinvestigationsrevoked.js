/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalInvestigationsRevoked from 'models/sections/legalInvestigationsRevoked'

export const validateLegalInvestigationsRevoked = (data, formType, options = {}) => (
  validateModel(data, legalInvestigationsRevoked, options)
)
