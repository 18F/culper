import { validateModel, hasYesOrNo } from 'models/validate'
import debarred from 'models/debarred'

export const validateLegalInvestigationsDebarred = (data, formType, options = {}) => {
  const legalInvestigationsDebarredModel = {
    HasDebarment: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasDebarment && attributes.HasDebarment.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: debarred },
        }
      }
      return {}
    },
  }

  return validateModel(data, legalInvestigationsDebarredModel, options)
}
