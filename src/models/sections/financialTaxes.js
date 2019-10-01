import { hasYesOrNo } from 'models/validate'
import financialTaxes from 'models/financialTaxes'

const financialTaxesModel = {
  HasTaxes: {
    presence: true,
    hasValue: { validator: hasYesOrNo },
  },
  List: (value, attributes) => {
    const { HasTaxes } = attributes
    if (HasTaxes && HasTaxes.value === 'Yes') {
      return {
        presence: true,
        accordion: { validator: financialTaxes },
      }
    }
    return {}
  },
}

export default financialTaxesModel
