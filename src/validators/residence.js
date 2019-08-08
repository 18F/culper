import { validateModel } from 'models/validate'
import residence from 'models/residence'

export const validateResidence = data => validateModel(data, residence)

export const validateHistoryResidence = (data) => {
  const historyResidenceModel = {
    List: {
      presence: true,
      accordion: { validator: residence },
    },
  }

  return validateModel(data, historyResidenceModel)
}

export class ResidenceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateResidence(this.data) === true
  }
}

export default class HistoryResidenceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateHistoryResidence(this.data) === true
  }
}
