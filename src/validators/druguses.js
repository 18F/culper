/* eslint-disable import/prefer-default-export */
import {
  requireDrugWhileSafety,
  requireDrugWithClearance,
  requireDrugInFuture,
} from 'helpers/branches'

import { validateModel } from 'models/validate'
import substanceDrugUsesModel from 'models/sections/substanceDrugUses'

export const validateDrugUses = (data = {}, formType, options = {}) => {
  const modelOptions = {
    requireUseWhileEmployed: requireDrugWhileSafety(formType),
    requireUseWithClearance: requireDrugWithClearance(formType),
    requireUseInFuture: requireDrugInFuture(formType),
  }

  return validateModel(data, substanceDrugUsesModel, { ...modelOptions, ...options })
}
