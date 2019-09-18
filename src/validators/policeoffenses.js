/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
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
    List: {
      presence: true,
      branchCollection: { validator: offense },
    },
  }

  return validateModel(data, policeOffensesModel, { ...options, ...modelOptions })
}
