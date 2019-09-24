/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import financialTaxes from 'models/sections/financialTaxes'

export const validateFinancialTaxes = (data, formType, options = {}) => (
  validateModel(data, financialTaxes, options)
)
