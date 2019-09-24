/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import financialCredit from 'models/sections/financialCredit'

export const validateFinancialCredit = (data, formType, options = {}) => (
  validateModel(data, financialCredit, options)
)
