import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBenefit from 'models/foreignBenefit'

export const validateForeignBenefitActivity = (data, formType, options = {}) => {
  const foreignBenefitActivityModel = {
    HasBenefits: {
      presence: true,
      hasValue: { validator: hasYesOrNo },
    },
    List: (value, attributes) => {
      if (attributes.HasBenefits && attributes.HasBenefits.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBenefit },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBenefitActivityModel, options)
}

export default class ForeignBenefitActivityValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignBenefitActivity(this.data) === true
  }
}
