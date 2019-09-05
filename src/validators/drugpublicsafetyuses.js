import { validateModel, hasYesOrNo } from 'models/validate'
import drugSafetyUse from 'models/drugSafetyUse'

export const validateDrugSafetyUse = data => (
  validateModel(data, drugSafetyUse)
)

export const validateDrugSafetyUses = (data, formType, options = {}) => {
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

  return validateModel(data, drugSafetyUsesModel, options)
}

export default class DrugPublicSafetyUsesValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDrugSafetyUses(this.data) === true
  }
}

export class DrugPublicSafetyUseValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDrugSafetyUse(this.data) === true
  }
}
