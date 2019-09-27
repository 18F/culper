/* eslint-disable import/prefer-default-export */
import {
  requireDrugWhileSafety,
  requireDrugWithClearance,
} from 'helpers/branches'

import { validateModel } from 'models/validate'
import substanceDrugPrescriptionUsesModel from 'models/sections/substanceDrugPrescriptionUses'

export const validateDrugPrescriptionUses = (data = {}, formType, options = {}) => {
  const modelOptions = {
    requireUseWhileEmployed: requireDrugWhileSafety(formType),
    requireUseWithClearance: requireDrugWithClearance(formType),
  }

  return validateModel(data, substanceDrugPrescriptionUsesModel, { ...modelOptions, ...options })
}
