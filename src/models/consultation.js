import { hasYesOrNo } from 'models/validate'
import order from 'models/shared/order'

const consultation = {
  Consulted: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.Consulted && attributes.Consulted.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: order, requireDisposition: true },
      }
    }
    return {}
  },
}

export default consultation
