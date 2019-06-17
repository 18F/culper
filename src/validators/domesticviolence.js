import { validateModel, hasYesOrNo } from 'models/validate'
import domesticViolence from 'models/domesticViolence'

export const validateDomesticViolenceItem = data => (
  validateModel(data, domesticViolence) === true
)

export const validateDomesticViolence = (data) => {
  const domesticViolenceModel = {
    HasDomesticViolence: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasDomesticViolence && attributes.HasDomesticViolence.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: domesticViolence },
        }
      }

      return {}
    },
  }

  return validateModel(data, domesticViolenceModel) === true
}

export default class DomesticViolence {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDomesticViolence(this.data)
  }
}

export class DomesticViolenceItem {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDomesticViolenceItem(this.data)
  }
}
