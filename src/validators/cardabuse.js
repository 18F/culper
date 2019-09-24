/* eslint-disable import/prefer-default-export */
import { validateModel } from 'models/validate'
import financialCardAbuse from 'models/sections/financialCardAbuse'
import { requireFinancialCardDisciplinaryDate } from 'helpers/branches'

export const validateFinancialCardAbuse = (data, formType, options = {}) => (
  validateModel(
    data,
    financialCardAbuse,
    {
      ...options,
      requireFinancialCardDisciplinaryDate: requireFinancialCardDisciplinaryDate(formType),
    },
  )
)
