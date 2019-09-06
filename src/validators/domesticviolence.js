import { validateModel, hasYesOrNo } from 'models/validate'
import domesticViolence from 'models/domesticViolence'

export const validateDomesticViolenceItem = data => (
  validateModel(data, domesticViolence)
)

export const validateDomesticViolence = (data, formType, options = {}) => {
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

  return validateModel(data, domesticViolenceModel, options)
}

export default class DomesticViolence {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDomesticViolence(this.data) === true
  }
}

export class DomesticViolenceItem {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateDomesticViolenceItem(this.data) === true
  }
}
