import { validateModel } from 'models/validate'
import employment from 'models/employment'
import historyEmployment from 'models/sections/historyEmployment'
import * as formTypes from 'constants/formTypes'
import * as formConfig from 'config/forms'

export const validateHistoryEmployment = (data, formType = formTypes.SF86) => {
  // TODO years requirement is not enforced by validator yet
  const years = formType
    && formConfig[formType]
    && formConfig[formType].HISTORY_EMPLOYMENT_YEARS

  return validateModel(data, historyEmployment, { requireYears: years })
}
