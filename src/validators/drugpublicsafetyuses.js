import { validateModel, hasYesOrNo } from 'models/validate'
import drugSafetyUse from 'models/drugSafetyUse'

export const validateDrugSafetyUse = data => (
  validateModel(data, drugSafetyUse) === true
)

export const validateDrugSafetyUses = (data) => {
  const drugSafetyUsesModel = {
    UsedDrugs: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.UsedDrugs && attributes.UsedDrugs.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: drugSafetyUse },
        }
      }
      return {}
    },
  }

  return validateModel(data, drugSafetyUsesModel) === true
}

export default class DrugPublicSafetyUsesValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDrugSafetyUses(this.data)
  }
}

export class DrugPublicSafetyUseValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDrugSafetyUse(this.data)
  }
}
