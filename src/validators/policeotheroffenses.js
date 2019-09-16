import store from 'services/store'
import * as formTypes from 'constants/formTypes'
import { validateModel, hasYesOrNo, checkValue } from 'models/validate'	
import otherOffense from 'models/otherOffense'
import { requireLegalPoliceFirearms, requireLegalPoliceDrugs } from 'helpers/branches'

export const validatePoliceOtherOffenses = (data, formType, options = {}) => {
  const modelOptions = {
    requireLegalPoliceFirearms: requireLegalPoliceFirearms(formType),
    requireLegalPoliceDrugs: requireLegalPoliceDrugs(formType),
  }


  const policeOtherOffensesModel = {	
    HasOtherOffenses: { presence: true, hasValue: { validator: hasYesOrNo } },	
    List: (value, attributes) => (	
      checkValue(attributes.HasOtherOffenses, 'Yes')	
        ? {	
          presence: true,	
          accordion: { validator: otherOffense },	
        } : {}	
    ),	
  }	

  return validateModel(data, policeOtherOffensesModel, { ...options, ...modelOptions })
}
