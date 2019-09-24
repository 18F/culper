/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import financialGambling from 'models/sections/financialGambling'

export const validateFinancialGambling = (data, formType, options = {}) => (
  validateModel(data, financialGambling, options)
)
