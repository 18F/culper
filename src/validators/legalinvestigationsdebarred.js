/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalInvestigationsDebarred from 'models/sections/legalInvestigationsDebarred'

export const validateLegalInvestigationsDebarred = (data, formType, options = {}) => (
  validateModel(data, legalInvestigationsDebarred, options)
)
