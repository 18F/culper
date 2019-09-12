import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessAdvice from 'models/foreignBusinessAdvice'

export const validateForeignBusinessAdvice = (data, formType, options = {}) => {
  const foreignBusinessAdviceModel = {
    HasForeignAdvice: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignAdvice && attributes.HasForeignAdvice.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessAdvice },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessAdviceModel, options)
}
