import store from 'services/store'

import * as formTypes from 'constants/formTypes'
import {
  requireDrugWhileSafety,
  requireDrugWithClearance,
} from 'helpers/branches'

import { validateModel, hasYesOrNo } from 'models/validate'
import drugPrescriptionUse from 'models/drugPrescriptionUse'

export const validateDrugPrescriptionUse = (data = {}, formType = formTypes.SF86) => (
  validateModel(data, drugPrescriptionUse, {
    requireUseWhileEmployed: requireDrugWhileSafety(formType),
    requireUseWithClearance: requireDrugWithClearance(formType),
  }) === true
)

export const validateDrugPrescriptionUses = (data = {}, formType = formTypes.SF86) => {
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

  return validateModel(data, drugUsesModel) === true
}

/** Object Validators (as classes) - legacy */
export default class DrugPrescriptionUsesValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  isValid() {
    return validateDrugPrescriptionUses(this.data, this.formType)
  }
}

export class DrugPrescriptionUseValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  isValid() {
    return validateDrugPrescriptionUse(this.data, this.formType)
  }
}
