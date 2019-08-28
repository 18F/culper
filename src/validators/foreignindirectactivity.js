import { validateModel, hasYesOrNo } from 'models/validate'
import foreignIndirectInterest from 'models/foreignIndirectInterest'

export const validateForeignIndirectActivity = (data) => {
  const foreignIndirectActivityModel = {
    HasInterests: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasInterests && attributes.HasInterests.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignIndirectInterest },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignIndirectActivityModel)
}

export default class ForeignIndirectActivityValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignIndirectActivity(this.data) === true
  }
}
