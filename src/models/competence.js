import { hasYesOrNo } from 'models/validate'
import order from 'models/shared/order'

const competence = {
  IsIncompetent: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.IsIncompetent && attributes.IsIncompetent.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: order, requireDisposition: false },
      }
    }
    return {}
  },
}

export default competence
