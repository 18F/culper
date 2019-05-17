import { validateModel } from 'models/validate'
import residence from 'models/residence'

export const validateResidence = data => validateModel(data, residence) === true

export const validateHistoryResidence = (data) => {
  const historyResidenceModel = {
    List: {
      presence: true,
      accordion: { validator: residence },
    },
  }

  return validateModel(data, historyResidenceModel) === true
}

export class ResidenceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateResidence(this.data)
  }
}

export default class HistoryResidenceValidator {
  constructor(data = {}) {
    this.data = data
  }

  isValid() {
    return validateHistoryResidence(this.data)
  }
}
