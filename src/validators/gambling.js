import { validateModel, hasYesOrNo } from 'models/validate'
import financialGambling from 'models/financialGambling'

const financialGamblingModel = {
  HasGamblingDebt: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    const { HasGamblingDebt } = attributes
    if (HasGamblingDebt && HasGamblingDebt.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialGambling },
      }
    }
    return {}
  },
}

export const validateFinancialGambling = (data, formType, options = {}) => (
  validateModel(data, financialGamblingModel, options)
)
