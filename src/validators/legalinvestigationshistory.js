/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import { requireLegalInvestigationClearanceGranted } from 'helpers/branches'
import legalInvestigationsHistory from 'models/sections/legalInvestigationsHistory'

export const validateLegalInvestigationsHistory = (data, formType, options = {}) => {
  const modelOptions = {
    requireLegalInvestigationClearanceGranted: requireLegalInvestigationClearanceGranted(formType),
  }

  return validateModel(data, legalInvestigationsHistory, { ...options, ...modelOptions })
}
