import { validateModel, hasYesOrNo } from 'models/validate'
import foreignSupport from 'models/foreignSupport'

export const validateForeignActivitiesSupport = (data) => {
  const foreignActivitiesSupportModel = {
    HasForeignSupport: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasForeignSupport && attributes.HasForeignSupport.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: foreignSupport },
        }
      }

      return {}
    },
  }

  return validateModel(data, foreignActivitiesSupportModel)
}
