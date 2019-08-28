import { validateModel, hasYesOrNo } from 'models/validate'
import nonCriminalCourtAction from 'models/nonCriminalCourtAction'

export const validateNonCriminalCourtAction = data => (
  validateModel(data, nonCriminalCourtAction)
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

  return validateModel(data, legalNonCriminalCourtActionsModel)
}

export default class NonCriminalCourtActionsValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateLegalNonCriminalCourtActions(this.data) === true
  }
}

export class NonCriminalCourtActionValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateNonCriminalCourtAction(this.data) === true
  }
}
