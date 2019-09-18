/* eslint-disable import/prefer-default-export */
import { validateModel, hasYesOrNo } from 'models/validate'
import financialDelinquentPayments from 'models/financialDelinquentPayments'

import { requireFinancialDelinquentName, requireFinancialDelinquentInfraction } from 'helpers/branches'

const delinquentItemsModel = {
  HasDelinquent: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes, attributeName, options) => {
    const { HasDelinquent } = attributes
    if (HasDelinquent && HasDelinquent.value === 'Yes') {
      return {
        presence: true,
        accordion: {
          validator: financialDelinquentPayments,
          ...options,
        },
      }
    }
    return {}
  },
}

export const validateFinancialDelinquent = (data, formType, options = {}) => {
  const requiredFinancialDelinquentName = requireFinancialDelinquentName(formType)
  const requiredFinancialDelinquentInfraction = requireFinancialDelinquentInfraction(formType)
  return validateModel(data, delinquentItemsModel, {
    ...options,
    requiredFinancialDelinquentName,
    requiredFinancialDelinquentInfraction,
  })
}
