/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import financialDelinquent from 'models/sections/financialDelinquent'

import { requireFinancialDelinquentName, requireFinancialDelinquentInfraction } from 'helpers/branches'

export const validateFinancialDelinquent = (data, formType, options = {}) => {
  const requiredFinancialDelinquentName = requireFinancialDelinquentName(formType)
  const requiredFinancialDelinquentInfraction = requireFinancialDelinquentInfraction(formType)
  return validateModel(data, financialDelinquent, {
    ...options,
    requiredFinancialDelinquentName,
    requiredFinancialDelinquentInfraction,
  })
}
