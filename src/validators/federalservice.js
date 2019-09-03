import { validateModel } from 'models/validate'
import federal from 'models/federal'
import historyFederal from 'models/sections/historyFederalService'

export const validateFederalServiceItem = data => (
  validateModel(data, federal)
)

export const validateHistoryFederal = data => (
  validateModel(data, historyFederal)
)

export class FederalServiceItemValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateFederalServiceItem(this.data) === true
  }
}
