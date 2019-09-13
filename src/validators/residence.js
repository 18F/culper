import { validateModel } from 'models/validate'
import historyResidence from 'models/sections/historyResidence'
import * as formConfig from 'config/forms'

export const validateHistoryResidence = (data, formType, options = {}) => {
  const years = formType
    && formConfig[formType]
    && formConfig[formType].HISTORY_RESIDENCE_YEARS

  return validateModel(data, historyResidence, { ...options, requireYears: years })
}
