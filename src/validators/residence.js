import { validateModel } from 'models/validate'
import residence from 'models/residence'
import historyResidence from 'models/sections/historyResidence'

export const validateResidence = data => validateModel(data, residence) === true

export const validateHistoryResidence = data => (
  validateModel(data, historyResidence) === true
)

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
