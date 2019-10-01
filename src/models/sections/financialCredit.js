import { hasYesOrNo } from 'models/validate'
import financialCreditCounseling from 'models/financialCreditCounseling'

const creditCounselingModel = {
  HasCreditCounseling: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    const { HasCreditCounseling } = attributes
    if (HasCreditCounseling && HasCreditCounseling.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialCreditCounseling },
      }
    }
    return {}
  },
}

export default creditCounselingModel
