import { hasYesOrNo } from 'models/validate'
import foreignBusinessEmployment from 'models/foreignBusinessEmployment'

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

export default foreignBusinessEmploymentModel
