/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalPoliceOtherOffenses from 'models/sections/legalPoliceOtherOffenses'
import { requireLegalPoliceFirearms, requireLegalPoliceDrugs } from 'helpers/branches'

export const validatePoliceOtherOffenses = (data, formType, options = {}) => {
  const modelOptions = {
    requireLegalPoliceFirearms: requireLegalPoliceFirearms(formType),
    requireLegalPoliceDrugs: requireLegalPoliceDrugs(formType),
  }

  return validateModel(data, legalPoliceOtherOffenses, { ...options, ...modelOptions })
}
