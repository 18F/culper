import { hasYesOrNo } from 'models/validate'
import foreignBusinessFamily from 'models/foreignBusinessFamily'

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

export default foreignBusinessFamilyModel
