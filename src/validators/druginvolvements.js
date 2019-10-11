/* eslint-disable import/prefer-default-export */
import {
  requireDrugWhileSafety,
  requireDrugWithClearance,
  requireDrugInFuture,
} from 'helpers/branches'

import { validateModel } from 'models/validate'
import substanceDrugInvolvementsModel from 'models/sections/substanceDrugInvolvements'

export const validateDrugInvolvements = (data = {}, formType, options = {}) => {
  const modelOptions = {
    requireInvolvementWhileEmployed: requireDrugWhileSafety(formType),
    requireInvolvementWithClearance: requireDrugWithClearance(formType),
    requireInvolvementInFuture: requireDrugInFuture(formType),
  }

  return validateModel(data, substanceDrugInvolvementsModel, { ...modelOptions, ...options })
}
