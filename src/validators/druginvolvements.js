import store from 'services/store'
import * as formTypes from 'constants/formTypes'
import {
  requireDrugWhileSafety,
  requireDrugWithClearance,
  requireDrugInFuture,
} from 'helpers/branches'

import { validateModel, hasYesOrNo } from 'models/validate'
import drugInvolvement from 'models/drugInvolvement'

export const validateDrugInvolvement = (data = {}, formType = formTypes.SF86) => (
  validateModel(data, drugInvolvement, {
    requireInvolvementWhileEmployed: requireDrugWhileSafety(formType),
    requireInvolvementWithClearance: requireDrugWithClearance(formType),
    requireInvolvementInFuture: requireDrugInFuture(formType),
  })
)

export const validateDrugInvolvements = (data = {}, formType = formTypes.SF86) => {
  const drugInvolvementsModel = {
    Involved: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.Involved && attributes.Involved.value === 'Yes') {
        return {
          presence: true,
          accordion: {
            validator: drugInvolvement,
            requireInvolvementWhileEmployed: requireDrugWhileSafety(formType),
            requireInvolvementWithClearance: requireDrugWithClearance(formType),
            requireInvolvementInFuture: requireDrugInFuture(formType),
          },
        }
      }
      return {}
    },
  }

  return validateModel(data, drugInvolvementsModel)
}

/** Object Validators (as classes) - legacy */
export class DrugInvolvementValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  validFuture() {
    return validateModel(this.data, {
      InvolvementInFuture: drugInvolvement.InvolvementInFuture,
      Explanation: drugInvolvement.Explanation,
    }, { requireInvolvementInFuture: requireDrugInFuture(this.formType) }) === true
  }

  isValid() {
    return validateDrugInvolvement(this.data, this.formType) === true
  }
}

export default class DrugInvolvementsValidator {
  constructor(data = {}) {
    const state = store.getState()
    const { formType } = state.application.Settings
    this.data = data
    this.formType = formType
  }

  isValid() {
    return validateDrugInvolvements(this.data, this.formType) === true
  }
}
