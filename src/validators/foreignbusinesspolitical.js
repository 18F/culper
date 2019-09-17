import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessPolitical from 'models/foreignBusinessPolitical'

export const validateForeignBusinessPolitical = (data, formType, options = {}) => {
  const foreignBusinessPoliticalModel = {
    HasForeignPolitical: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignPolitical && attributes.HasForeignPolitical.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessPolitical },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessPoliticalModel, options)
}
