import { validateModel } from 'models/validate'
import employment from 'models/employment'
import historyEmployment from 'models/sections/historyEmployment'
import * as formConfig from 'config/forms'

export const validateHistoryEmployment = (data, formType, options = {}) => {
  const years = formType
    && formConfig[formType]
    && formConfig[formType].HISTORY_EMPLOYMENT_YEARS

  return validateModel(data, historyEmployment, { ...options, requireYears: years })
}
