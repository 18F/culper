import { validateModel, hasYesOrNo } from 'models/validate'
import foreignRealEstateInterest from 'models/foreignRealEstateInterest'

export const validateForeignRealEstateActivity = (data, formType, options = {}) => {
  const foreignRealEstateActivityModel = {
    HasInterests: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasInterests && attributes.HasInterests.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignRealEstateInterest },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignRealEstateActivityModel, options)
}

export default class ForeignRealEstateActivityValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateForeignRealEstateActivity(this.data) === true
  }
}
