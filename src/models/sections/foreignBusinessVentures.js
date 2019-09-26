import { hasYesOrNo } from 'models/validate'
import foreignBusinessVentures from 'models/foreignBusinessVentures'

const foreignBusinessVenturesModel = {
  HasForeignVentures: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasForeignVentures && attributes.HasForeignVentures.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: foreignBusinessVentures },
      }
    }

    return {}
  },
}

export default foreignBusinessVenturesModel
