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
}
