/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import financialBankruptcy from 'models/sections/financialBankruptcy'

export const validateFinancialBankruptcy = (data, formType, options = {}) => (
  validateModel(data, financialBankruptcy, options)
)
