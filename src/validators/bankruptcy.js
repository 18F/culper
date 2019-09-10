import { validateModel, hasYesOrNo } from 'models/validate'
import financialBankruptcy from 'models/financialBankruptcy'

const financialBankruptcyModel = {
  HasBankruptcy: { presence: true, hasValue: { validator: hasYesOrNo } },
  List: (value, attributes) => {
    const { HasBankruptcy } = attributes
    if (HasBankruptcy && HasBankruptcy.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialBankruptcy },
      }
    }
    return {}
  },
}

export const validateFinancialBankruptcy = data => (
  validateModel(data, financialBankruptcyModel)
)
