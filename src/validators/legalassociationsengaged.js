import { validateModel, hasYesOrNo } from 'models/validate'
import terrorismEngaged from 'models/terrorismEngaged'

export const validateLegalAssociationEngaged = (data, formType, options = {}) => {
  const legalAssociationEngagedModel = {
    HasEngaged: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasEngaged && attributes.HasEngaged.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: terrorismEngaged },
        }
      }

      return {}
    },
  }

  return validateModel(data, legalAssociationEngagedModel, options)
}
