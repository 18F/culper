/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import legalPoliceOffenses from 'models/sections/legalPoliceOffenses'

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

  return validateModel(data, legalPoliceOffenses, { ...options, ...modelOptions })
}
