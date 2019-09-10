import store from 'services/store'
import * as formTypes from 'constants/formTypes'
import {
  requireDrugWhileSafety,
  requireDrugWithClearance,
  requireDrugInFuture,
} from 'helpers/branches'

import { validateModel, hasYesOrNo } from 'models/validate'
import drugUse from 'models/drugUse'

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

  return validateModel(data, drugUsesModel)
}
