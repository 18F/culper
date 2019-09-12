import store from 'services/store'
import * as formTypes from 'constants/formTypes'
import {
  requireDrugWhileSafety,
  requireDrugWithClearance,
  requireDrugInFuture,
} from 'helpers/branches'

import { validateModel, hasYesOrNo } from 'models/validate'
import drugInvolvement from 'models/drugInvolvement'

export const validateDrugInvolvements = (data = {}, formType, options = {}) => {
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

  return validateModel(data, drugInvolvementsModel, options)
}
