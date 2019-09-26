import { hasYesOrNo } from 'models/validate'
import financialNonpayment from 'models/financialNonpayment'

const nonpaymentModel = {
  HasNonpayment: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    const { HasNonpayment } = attributes
    if (HasNonpayment && HasNonpayment.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialNonpayment },
      }
    }
    return {}
  },
}

export default nonpaymentModel
