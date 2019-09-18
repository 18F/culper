/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import otherOffense from 'models/otherOffense'
import { requireLegalPoliceFirearms, requireLegalPoliceDrugs } from 'helpers/branches'

export const validatePoliceOtherOffenses = (data, formType, options = {}) => {
  const modelOptions = {
    requireLegalPoliceFirearms: requireLegalPoliceFirearms(formType),
    requireLegalPoliceDrugs: requireLegalPoliceDrugs(formType),
  }

  const policeOtherOffensesModel = {
    List: {
      presence: true,
      branchCollection: { validator: otherOffense },
    },
  }

  return validateModel(data, policeOtherOffensesModel, { ...options, ...modelOptions })
}
