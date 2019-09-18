/* eslint-disable import/prefer-default-export */
import {
  requireDrugWhileSafety,
  requireDrugWithClearance,
} from 'helpers/branches'

import { validateModel, hasYesOrNo } from 'models/validate'
import drugPrescriptionUse from 'models/drugPrescriptionUse'

export const validateDrugPrescriptionUses = (data = {}, formType, options = {}) => {
  const drugUsesModel = {
    MisusedDrugs: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.MisusedDrugs && attributes.MisusedDrugs.value === 'Yes') {
        return {
          presence: true,
          accordion: {
            validator: drugPrescriptionUse,
            requireUseWhileEmployed: requireDrugWhileSafety(formType),
            requireUseWithClearance: requireDrugWithClearance(formType),
          },
        }
      }
      return {}
    },
  }

  return validateModel(data, drugUsesModel, options)
}
