import { validateModel, hasYesOrNo } from 'models/validate'
import federal from 'models/federal'

export const validateFederalServiceItem = data => (
  validateModel(data, federal)
)

export const validateHistoryFederal = (data) => {
  const historyFederalModel = {
    HasFederalService: {
      presence: true,
      hasValue: { validator: hasYesOrNo },
    },
    List: (value, attributes) => {
      // Only required if HasFederalService is yes
      if (attributes.HasFederalService && attributes.HasFederalService.value === 'Yes') {
        return {
          presence: true,
          accordion: { validator: federal },
        }
      }

      return {}
    },
  }

  return validateModel(data, historyFederalModel)
}

export default class FederalServiceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateHistoryFederal(this.data) === true
  }
}

export class FederalServiceItemValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateFederalServiceItem(this.data) === true
  }
}
