import { validateModel, hasYesOrNo, checkValue } from 'models/validate'
import offense from 'models/offense'
import {
  requireLegalOffenseInvolvements,
  requireLegalOffenseSentenced,
  requireLegalOffenseIncarcerated,
} from 'helpers/branches'

export const validatePoliceOffenses = (data, formType, options = {}) => {
  const modelOptions = {
    requireLegalOffenseInvolvements: requireLegalOffenseInvolvements(formType),
    requireLegalOffenseSentenced: requireLegalOffenseSentenced(formType),
    requireLegalOffenseIncarcerated: requireLegalOffenseIncarcerated(formType),
  }

  const policeOffensesModel = {	
    HasOffenses: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => (
      checkValue(attributes.HasOffenses, 'Yes')
        ? {
          presence: true,
          accordion: { validator: offense },
        } : {}
    ),
  }

  return validateModel(data, policeOffensesModel, { ...options, ...modelOptions })
}
