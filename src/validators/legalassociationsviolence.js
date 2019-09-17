import { validateModel, hasYesOrNo } from 'models/validate'
import violence from 'models/violence'

export const validateLegalViolence = (data, formType, options = {}) => {
  const legalViolenceModel = {
    HasViolence: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasViolence && attributes.HasViolence.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: violence },
        }
      }
      return {}
    },
  }

  return validateModel(data, legalViolenceModel, options)
}
