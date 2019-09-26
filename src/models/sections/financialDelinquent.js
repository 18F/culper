import { hasYesOrNo } from 'models/validate'
import financialDelinquentPayments from 'models/financialDelinquentPayments'

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

export default delinquentItemsModel
