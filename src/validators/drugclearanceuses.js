import { validateModel, hasYesOrNo } from 'models/validate'
import drugClearanceUse from 'models/drugClearanceUse'

export const validateDrugClearanceUse = data => (
  validateModel(data, drugClearanceUse)
)

export const validateDrugClearanceUses = (data) => {
  const drugClearanceUsesModel = {
    UsedDrugs: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.UsedDrugs && attributes.UsedDrugs.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: drugClearanceUse },
        }
      }
      return {}
    },
  }

  return validateModel(data, drugClearanceUsesModel)
}

export default class DrugClearanceUsesValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDrugClearanceUses(this.data) === true
  }
}

export class DrugClearanceUseValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDrugClearanceUse(this.data) === true
  }
}
