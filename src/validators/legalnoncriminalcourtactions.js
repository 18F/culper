import { validateModel, hasYesOrNo } from 'models/validate'
import nonCriminalCourtAction from 'models/nonCriminalCourtAction'

export const validateNonCriminalCourtAction = data => (
  validateModel(data, nonCriminalCourtAction) === true
)

export const validateLegalNonCriminalCourtActions = (data) => {
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

  return validateModel(data, legalNonCriminalCourtActionsModel) === true
}

export default class NonCriminalCourtActionsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalNonCriminalCourtActions(this.data)
  }
}

export class NonCriminalCourtActionValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateNonCriminalCourtAction(this.data)
  }
}
