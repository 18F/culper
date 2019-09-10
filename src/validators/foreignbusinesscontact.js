import { validateModel, hasYesOrNo } from 'models/validate'
import foreignBusinessContact from 'models/foreignBusinessContact'

export const validateForeignBusinessContacts = (data) => {
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

  return validateModel(data, foreignBusinessContactsModel)
}
