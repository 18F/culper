import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessFamily from 'models/foreignBusinessFamily'

export const validateForeignBusinessFamily = (data, formType, options = {}) => {
  const foreignBusinessFamilyModel = {
    HasForeignFamily: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignFamily && attributes.HasForeignFamily.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessFamily },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessFamilyModel, options)
}
