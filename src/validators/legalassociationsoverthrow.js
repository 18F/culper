import { validateModel, hasYesOrNo } from 'models/validate'
import overthrow from 'models/overthrow'

export const validateLegalOverthrow = (data, formType, options = {}) => {
  const legalOverthrowModel = {
    HasOverthrow: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasOverthrow && attributes.HasOverthrow.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: overthrow },
        }
      }
      return {}
    },
  }

  return validateModel(data, legalOverthrowModel, options)
}
