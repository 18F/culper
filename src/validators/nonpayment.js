/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import financialNonPayment from 'models/sections/financialNonPayment'

export const validateFinancialNonpayment = (data, formType, options = {}) => (
  validateModel(data, financialNonPayment, options)
)
