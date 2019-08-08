import { validateModel } from 'models/validate'
import residence from 'models/residence'
import historyResidence from 'models/sections/historyResidence'
import * as formTypes from 'constants/formTypes'
import * as formConfig from 'config/forms'

export const validateResidence = data => (
  validateModel(data, residence) === true
)

export const validateHistoryResidence = (data, formType = formTypes.SF86) => {
  const years = formType
    && formConfig[formType]
    && formConfig[formType].HISTORY_RESIDENCE_YEARS

  return validateModel(data, historyResidence, { requireYears: years }) === true
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
