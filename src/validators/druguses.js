import store from 'services/store'
import * as formTypes from 'constants/formTypes'
import {
  requireDrugWhileSafety,
  requireDrugWithClearance,
  requireDrugInFuture,
} from 'helpers/branches'

import { validateModel, hasYesOrNo } from 'models/validate'
import drugUse from 'models/drugUse'

export const validateDrugUse = (data = {}, formType = formTypes.SF86) => (
  validateModel(data, drugUse, {
    requireUseWhileEmployed: requireDrugWhileSafety(formType),
    requireUseWithClearance: requireDrugWithClearance(formType),
    requireUseInFuture: requireDrugInFuture(formType),
  }) === true
)

export const validateDrugUses = (data = {}, formType = formTypes.SF86) => {
  const drugUsesModel = {
    UsedDrugs: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.UsedDrugs && attributes.UsedDrugs.value === 'Yes') {
        return {
          presence: true,
          accordion: {
            validator: drugUse,
            requireUseWhileEmployed: requireDrugWhileSafety(formType),
            requireUseWithClearance: requireDrugWithClearance(formType),
            requireUseInFuture: requireDrugInFuture(formType),
          },
        }
      }
      return {}
    },
  }

  return validateModel(data, drugUsesModel) === true
}

/** Object Validators (as classes) - legacy */
export default class DrugUsesValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  isValid() {
    return validateDrugUses(this.data, this.formType)
  }
}

export class DrugUseValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  isValid() {
    return validateDrugUse(this.data, this.formType)
  }
}
