import { validateModel, hasYesOrNo } from 'models/validate'
import foreignDirectInterest from 'models/foreignDirectInterest'

export const validateForeignDirectActivity = (data) => {
  const foreignDirectActivityModel = {
    HasInterests: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasInterests && attributes.HasInterests.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignDirectInterest },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignDirectActivityModel)
}

export default class ForeignDirectActivityValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignDirectActivity(this.data) === true
  }
}
