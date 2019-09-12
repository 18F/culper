import { validateModel, hasYesOrNo } from 'models/validate'
import nonCriminalCourtAction from 'models/nonCriminalCourtAction'

export const validateLegalNonCriminalCourtActions = (data, formType, options = {}) => {
  const legalNonCriminalCourtActionsModel = {
    HasCourtActions: { presence: true, hasValue: { validator: hasYesOrNo } },
    List: (value, attributes) => {
      if (attributes.HasCourtActions && attributes.HasCourtActions.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: nonCriminalCourtAction },
        }
      }
      return {}
    },
  }

  return validateModel(data, legalNonCriminalCourtActionsModel, options)
}
