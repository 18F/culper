import { hasYesOrNo } from 'models/validate'
import foreignBusinessContact from 'models/foreignBusinessContact'

const foreignBusinessContactsModel = {
  HasForeignContact: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    if (attributes.HasForeignContact && attributes.HasForeignContact.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: foreignBusinessContact },
      }
    }

    return {}
  },
}

export default foreignBusinessContactsModel
