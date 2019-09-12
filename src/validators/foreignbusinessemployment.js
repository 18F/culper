import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessEmployment from 'models/foreignBusinessEmployment'

export const validateForeignBusinessEmployment = (data, formType, options = {}) => {
  const foreignBusinessEmploymentModel = {
    HasForeignEmployment: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignEmployment && attributes.HasForeignEmployment.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignBusinessEmployment },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignBusinessEmploymentModel, options)
}
