import { validateModel, hasYesOrNo } from 'models/validate'
import foreignContact from 'models/foreignContact'

export const validateForeignContacts = (data, formType, options = {}) => {
  const foreignContactsModel = {
    HasForeignContacts: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignContacts && attributes.HasForeignContacts.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignContact },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignContactsModel, options)
}
