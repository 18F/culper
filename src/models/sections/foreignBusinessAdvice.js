import { hasYesOrNo } from 'models/validate'
import foreignBusinessAdvice from 'models/foreignBusinessAdvice'

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

export default foreignBusinessAdviceModel
