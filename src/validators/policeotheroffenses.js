import * as formTypes from 'constants/formTypes'
import { requireLegalPoliceFirearms, requireLegalPoliceDrugs } from 'helpers/branches'

export const validatePoliceOtherOffenses = (data, formType, options = {}) => {
  const modelOptions = {
    requireLegalPoliceFirearms: requireLegalPoliceFirearms(formType),
    requireLegalPoliceDrugs: requireLegalPoliceDrugs(formType),
  }
}
